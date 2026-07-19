"use client";

import { useState } from "react";
import { supabase, type Report, type Season } from "@/lib/supabase";
import { fuzzCoord, sanitizePhoto } from "@/lib/photo";

const BLOOM_LABELS = {
  blooming: "피는 중 🌱",
  full: "만개 🌸",
  faded: "졌어요 🍂",
} as const;

export default function ReportModal({
  season,
  pos,
  onClose,
  onCreated,
}: {
  season: Season;
  pos: { lat: number; lng: number };
  onClose: () => void;
  onCreated: (r: Report) => void;
}) {
  const [memo, setMemo] = useState("");
  const [bloomState, setBloomState] = useState<keyof typeof BLOOM_LABELS>("full");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setBusy(true);
    setError("");
    try {
      let photoUrl: string | null = null;
      if (file) {
        const clean = await sanitizePhoto(file);
        const path = `${season.id}/${crypto.randomUUID()}.jpg`;
        const { error: upErr } = await supabase.storage
          .from("photos")
          .upload(path, clean, { contentType: "image/jpeg" });
        if (upErr) throw new Error("사진 업로드에 실패했어요");
        photoUrl = supabase.storage.from("photos").getPublicUrl(path).data.publicUrl;
      }

      const { data, error: insErr } = await supabase
        .from("reports")
        .insert({
          season_id: season.id,
          lat: fuzzCoord(pos.lat),
          lng: fuzzCoord(pos.lng),
          memo: memo.trim(),
          photo_url: photoUrl,
          bloom_state: bloomState,
        })
        .select()
        .single();
      if (insErr || !data) throw new Error("제보 저장에 실패했어요");
      onCreated(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류가 났어요");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>
          {season.emoji} {season.flower_name} 제보하기
        </h2>

        <div className="bloom-states">
          {(Object.keys(BLOOM_LABELS) as (keyof typeof BLOOM_LABELS)[]).map((k) => (
            <button
              key={k}
              className={bloomState === k ? "on" : ""}
              onClick={() => setBloomState(k)}
            >
              {BLOOM_LABELS[k]}
            </button>
          ))}
        </div>

        <textarea
          rows={3}
          maxLength={200}
          placeholder="예: 담벼락을 따라 활짝 피었어요 (200자 이내)"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        <p className="privacy-note">
          🔒 사람 얼굴이 나온 사진은 업로드되지 않아요. 사진의 위치·시간
          정보(EXIF)는 자동으로 제거되며, 핀 위치는 약 10m 단위로 뭉개져
          저장돼요. 개인 주택 등 사생활 침해 우려가 있는 장소는 제보를 삼가주세요.
        </p>

        {error && <p className="error">{error}</p>}

        <button className="submit" disabled={busy} onClick={submit}>
          {busy ? "확인 중…" : "제보 올리기"}
        </button>
      </div>
    </div>
  );
}
