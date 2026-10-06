"use client";

// 운영자 검수 화면: 사진 제보 승인·거절, 신고로 숨겨진 제보 복구·삭제.
// 비밀번호는 이 탭(sessionStorage)에만 기억한다.

import { useCallback, useEffect, useState } from "react";
import type { Report, Season } from "@/lib/supabase";
import { splitMemo, timeAgo } from "@/lib/theme";

type Row = Report & { flags?: { reason: string; created_at: string }[] };
type Tab = "pending" | "flagged";
const KEY = "kkotmap-admin-key";

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<Tab>("pending");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [seasons, setSeasons] = useState<Pick<Season, "id" | "flower_name" | "emoji">[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<number | null>(null);

  useEffect(() => {
    try {
      setKey(sessionStorage.getItem(KEY) ?? "");
    } catch {}
  }, []);

  const load = useCallback(async () => {
    if (!key) return;
    setError("");
    setRows(null);
    const res = await fetch(`/api/admin?tab=${tab}`, { headers: { "x-admin-key": key } });
    const body = await res.json();
    if (!res.ok) {
      setError(body.error ?? "불러오지 못했어요");
      if (res.status === 401) {
        setKey("");
        try {
          sessionStorage.removeItem(KEY);
        } catch {}
      }
      return;
    }
    setRows(body.reports);
    setSeasons(body.seasons ?? []);
  }, [key, tab]);

  useEffect(() => {
    load();
  }, [load]);

  async function act(id: number, action: "approve" | "reject" | "restore" | "dismiss") {
    setBusy(id);
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "content-type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ id, action }),
    });
    setBusy(null);
    if (!res.ok) {
      setError((await res.json()).error ?? "처리하지 못했어요");
      return;
    }
    setRows((prev) => prev?.filter((r) => r.id !== id) ?? null);
  }

  if (!key) {
    return (
      <div className="page admin">
        <div className="page-inner">
          <header className="page-head">
            <p className="eyebrow">Admin</p>
            <h1>제보 검수</h1>
          </header>
          <form
            className="card admin-login"
            onSubmit={(e) => {
              e.preventDefault();
              try {
                sessionStorage.setItem(KEY, input);
              } catch {}
              setKey(input);
            }}
          >
            <input
              type="password"
              autoComplete="current-password"
              placeholder="운영자 비밀번호"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn primary" disabled={!input}>
              들어가기
            </button>
            {error && <p className="admin-error">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page admin">
      <div className="page-inner">
        <header className="page-head">
          <p className="eyebrow">Admin</p>
          <h1>제보 검수</h1>
          <p>사진 제보는 승인해야 지도에 올라가요. 신고 3건이 쌓인 제보는 자동으로 숨겨져요.</p>
        </header>

        <div className="segmented" role="tablist">
          {(
            [
              ["pending", "사진 검수 대기"],
              ["flagged", "신고로 숨김"],
            ] as const
          ).map(([t, label]) => (
            <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>
              {label}
            </button>
          ))}
        </div>

        {error && <p className="admin-error">{error}</p>}
        {rows === null && !error && <div className="skeleton" />}
        {rows?.length === 0 && <p className="empty">처리할 제보가 없어요 🎉</p>}

        <div className="admin-list">
          {rows?.map((r) => {
            const s = seasons.find((x) => x.id === r.season_id);
            const { title, desc } = splitMemo(r.memo);
            return (
              <article key={r.id} className="card admin-item">
                {r.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.photo_url} alt="" loading="lazy" />
                ) : (
                  <div className="admin-nophoto">사진 없음</div>
                )}
                <div className="admin-body">
                  <p className="row-meta">
                    #{r.id} · {s ? `${s.emoji} ${s.flower_name}` : "시즌 ?"} · {timeAgo(r.created_at)}
                  </p>
                  <b>{title || "(메모 없음)"}</b>
                  {desc && <p className="row-meta">{desc}</p>}
                  <a
                    className="row-meta"
                    href={`https://map.naver.com/p/search/${r.lat},${r.lng}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    위치 {r.lat.toFixed(4)}, {r.lng.toFixed(4)} 지도로 보기
                  </a>
                  {r.flags && r.flags.length > 0 && (
                    <ul className="admin-flags">
                      {r.flags.map((f, i) => (
                        <li key={i}>신고 · {f.reason || "사유 없음"} · {timeAgo(f.created_at)}</li>
                      ))}
                    </ul>
                  )}
                  <div className="admin-actions">
                    {tab === "pending" ? (
                      <>
                        <button className="btn ghost" disabled={busy === r.id} onClick={() => act(r.id, "reject")}>
                          거절 (사진 삭제)
                        </button>
                        <button className="btn primary" disabled={busy === r.id} onClick={() => act(r.id, "approve")}>
                          승인
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn ghost" disabled={busy === r.id} onClick={() => act(r.id, "dismiss")}>
                          삭제 확정
                        </button>
                        <button className="btn primary" disabled={busy === r.id} onClick={() => act(r.id, "restore")}>
                          문제없음, 복구
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <button
          className="btn ghost admin-logout"
          onClick={() => {
            try {
              sessionStorage.removeItem(KEY);
            } catch {}
            setKey("");
            setInput("");
          }}
        >
          나가기
        </button>
      </div>
    </div>
  );
}
