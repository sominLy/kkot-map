// 운영자 검수 API. 비밀번호(ADMIN_PASSWORD)가 맞을 때만 서비스 키로 RLS를 우회해 읽고 고친다.
// 서비스 키(SUPABASE_SERVICE_ROLE_KEY)는 서버에서만 쓰고 브라우저로 보내지 않는다.

import { createHash, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { buildStats, type StatEvent, type StatReport } from "@/lib/stats";

export const dynamic = "force-dynamic";

type Action = "approve" | "reject" | "restore" | "dismiss";

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !process.env.ADMIN_PASSWORD) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

type Db = NonNullable<ReturnType<typeof admin>>;

/** 거절한 사진은 저장소에서도 지운다 (공개 URL로 계속 열리지 않게) */
async function removePhoto(db: Db, id: number) {
  const { data: r } = await db.from("reports").select("photo_url").eq("id", id).single();
  const path = r?.photo_url?.split("/storage/v1/object/public/photos/")[1];
  if (path) await db.storage.from("photos").remove([decodeURIComponent(path)]);
}

const digest = (s: string) => createHash("sha256").update(s).digest();

async function authorized(req: Request): Promise<boolean> {
  const given = req.headers.get("x-admin-key") ?? "";
  const ok = timingSafeEqual(digest(given), digest(process.env.ADMIN_PASSWORD ?? ""));
  if (!ok) await new Promise((r) => setTimeout(r, 800)); // 비밀번호 대입 속도 늦추기
  return ok;
}

/** 1000행 제한을 넘어 전부 읽기 (최대 maxRows) */
async function readAll<T>(
  page: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
  maxRows = 100_000
): Promise<{ rows: T[]; error: string | null }> {
  const rows: T[] = [];
  for (let from = 0; from < maxRows; from += 1000) {
    const { data, error } = await page(from, from + 999);
    if (error) return { rows, error: error.message };
    rows.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }
  return { rows, error: null };
}

async function stats(db: Db, days: number) {
  const reports = await readAll<StatReport>((a, b) => db.from("reports").select("*").order("id").range(a, b));
  if (reports.error) throw new Error(reports.error);
  // app_events는 analytics.sql 실행 전이면 없다 → 행동 지표만 비워 둔다
  const events = await readAll<StatEvent>((a, b) =>
    db.from("app_events").select("kind, report_id, label, created_at").order("id").range(a, b)
  );
  const { count: flags } = await db.from("flags").select("*", { count: "exact", head: true });
  const { data: seasons } = await db.from("seasons").select("id, flower_name, emoji");
  return buildStats({
    reports: reports.rows,
    events: events.error ? [] : events.rows,
    analyticsReady: !events.error,
    seasons: seasons ?? [],
    flags: flags ?? 0,
    days,
  });
}

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "cache-control": "no-store" } });

export async function GET(req: Request) {
  const db = admin();
  if (!db) return json({ error: "서버에 ADMIN_PASSWORD·SUPABASE_SERVICE_ROLE_KEY가 없어요" }, 503);
  if (!(await authorized(req))) return json({ error: "비밀번호가 맞지 않아요" }, 401);

  const params = new URL(req.url).searchParams;
  const tab = params.get("tab");
  if (tab === "stats") {
    const days = [7, 30, 90].includes(Number(params.get("days"))) ? Number(params.get("days")) : 30;
    try {
      return json(await stats(db, days));
    } catch (e) {
      return json({ error: e instanceof Error ? e.message : "집계 실패" }, 500);
    }
  }
  const query =
    tab === "flagged"
      ? db.from("reports").select("*, flags(reason, created_at)").eq("hidden", true)
      : db.from("reports").select("*").eq("status", "pending").eq("hidden", false);
  const { data, error } = await query.order("created_at", { ascending: true }).limit(100);
  if (error) return json({ error: error.message }, 500);

  const { data: seasons } = await db.from("seasons").select("id, flower_name, emoji");
  return json({ reports: data, seasons });
}

export async function POST(req: Request) {
  const db = admin();
  if (!db) return json({ error: "서버에 ADMIN_PASSWORD·SUPABASE_SERVICE_ROLE_KEY가 없어요" }, 503);
  if (!(await authorized(req))) return json({ error: "비밀번호가 맞지 않아요" }, 401);

  const { id, action } = (await req.json()) as { id: number; action: Action };
  if (!Number.isInteger(id)) return json({ error: "id가 필요해요" }, 400);
  const now = new Date().toISOString();

  if (action === "approve") {
    const { error } = await db.from("reports").update({ status: "approved", reviewed_at: now }).eq("id", id);
    if (error) return json({ error: error.message }, 500);
  } else if (action === "reject") {
    await removePhoto(db, id);
    const { error } = await db
      .from("reports")
      .update({ status: "rejected", reviewed_at: now, photo_url: null })
      .eq("id", id);
    if (error) return json({ error: error.message }, 500);
  } else if (action === "restore") {
    // 신고로 숨겨진 제보가 문제없으면 다시 보이게 하고 신고 기록을 비운다
    await db.from("flags").delete().eq("report_id", id);
    const { error } = await db.from("reports").update({ hidden: false, reviewed_at: now }).eq("id", id);
    if (error) return json({ error: error.message }, 500);
  } else if (action === "dismiss") {
    // 숨김 유지 확정: 목록에서 빼기 위해 거절 처리 (사진도 삭제)
    await removePhoto(db, id);
    const { error } = await db
      .from("reports")
      .update({ status: "rejected", hidden: false, reviewed_at: now, photo_url: null })
      .eq("id", id);
    if (error) return json({ error: error.message }, 500);
  } else {
    return json({ error: "알 수 없는 동작" }, 400);
  }
  return json({ ok: true });
}
