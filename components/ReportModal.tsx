"use client";

import { useState } from "react";
import exifr from "exifr";
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
  onPickOnMap,
  onClose,
  onCreated,
}: {
  season: Season;
  pos: { lat: number; lng: number } | null;
  onPickOnMap: () => void;
  onClose: () => void;
  onCreated: (r: Report) => void;
}) {
  const [memo, setMemo] = useState("");
  const [bloomState, setBloomState] = useState<keyof typeof BLOOM_LABELS>("full");
  const [file, setFile] = useState<File | null>(null);
  const [gpsPos, setGpsPos] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsChecked, setGpsChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const effectivePos = pos ?? gpsPos;

  async function onFileChange(f: File | null) {
    setFile(f);
    setGpsPos(null);
    setGpsChecked(false);
    if (!f) return;
    // 사진 속 GPS는 위치 입력 편의를 위해 브라우저에서만 읽고,
    // 업로드되는 사진에서는 sanitizePhoto가 EXIF를 전부 제거한다.
    try {
      const gps = await exifr.gps(f);
      if (gps?.latitude && gps?.longitude) {
        setGpsPos({ lat: gps.latitude, lng: gps.longitude });
      }
    } catch {
      // GPS 정보가 없거나 읽기 실패 — 지도에서 직접 고르면 된다
    }
    setGpsChecked(true);
  }

  async function submit() {
    if (!effectivePos) {
      setError("위치가 필요해요. 지도에서 고르거나 위치정보가 있는 사진을 올려주세요.");
      return;
    }
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
          lat: fuzzCoord(effectivePos.lat),
          lng: fuzzCoord(effectivePos.lng),
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

        <div className={`pos-status${effectivePos ? " ok" : ""}`}>
          {pos
            ? "📍 지도에서 고른 위치로 제보돼요"
            : gpsPos
              ? "📷 사진의 위치정보를 사용할게요"
              : file && gpsChecked
                ? "사진에 위치정보가 없어요 — 지도에서 골라주세요"
                : "사진을 올리면 위치를 자동으로 읽어요"}
          <button className="pick-on-map" onClick={onPickOnMap}>
            지도에서 고르기
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />

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

        <p className="privacy-note">
          🔒 사람 얼굴이 나온 사진은 업로드되지 않아요. 사진의 위치정보는 핀을
          찍는 데만 쓰이고, 업로드되는 사진에서는 위치·시간 정보(EXIF)가 완전히
          제거돼요. 핀 위치는 약 10m 단위로 뭉개져 저장되며, 개인 주택 등 사생활
          침해 우려가 있는 장소는 제보를 삼가주세요.
        </p>

        {error && <p className="error">{error}</p>}

        <button className="submit" disabled={busy} onClick={submit}>
          {busy ? "확인 중…" : "제보 올리기"}
        </button>
      </div>
    </div>
  );
}
