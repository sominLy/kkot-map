"use client";

import { useEffect, useState } from "react";
import exifr from "exifr";
import { supabase, type Report, type Season } from "@/lib/supabase";
import { fuzzCoord, sanitizePhoto } from "@/lib/photo";
import { copyFor } from "@/lib/theme";
import Icon from "./Icon";

const STATES: Report["bloom_state"][] = ["blooming", "full", "faded"];

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
  const copy = copyFor(season);
  const [bloomState, setBloomState] = useState<Report["bloom_state"]>("full");
  const [file, setFile] = useState<File | null>(null);
  const [gpsPos, setGpsPos] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsChecked, setGpsChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const effectivePos = pos ?? gpsPos;

  // 고른 사진 미리보기 (메모리 해제까지)
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

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
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head">
          <div>
            <p className="eyebrow">New report</p>
            <h2>
              {season.emoji} {season.flower_name} 제보하기
            </h2>
            <p>발견한 풍경을 지도에 남겨주세요. 30초면 충분해요.</p>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="닫기">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="step">
          <p className="field-label">
            <span>
              <span className="step-num">1</span>위치
            </span>
          </p>
          <div className={`pos-status${effectivePos ? " ok" : ""}`}>
            {pos
              ? "지도에서 고른 위치로 제보돼요"
              : gpsPos
                ? "사진의 위치정보를 사용할게요"
                : file && gpsChecked
                  ? "사진에 위치정보가 없어요"
                  : "사진을 올리면 위치를 자동으로 읽어요"}
            <button className="pick-on-map" onClick={onPickOnMap}>
              지도에서 고르기
            </button>
          </div>
        </div>

        <div className="step">
          <p className="field-label">
            <span>
              <span className="step-num">2</span>사진
            </span>
            <span>선택</span>
          </p>
          <label className="drop">
            <span className="drop-thumb">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="고른 사진 미리보기" />
              ) : (
                <Icon name="camera" size={24} />
              )}
            </span>
            <span>
              <b>{file ? "사진을 바꾸려면 눌러주세요" : "사진 올리기"}</b>
              {file ? file.name : "얼굴이 나오지 않은 풍경 사진만 올라가요"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <div className="step">
          <p className="field-label">
            <span>
              <span className="step-num">3</span>지금 상태
            </span>
          </p>
          <div className="choice-grid">
            {STATES.map((k) => (
              <button
                key={k}
                className={`choice${bloomState === k ? " on" : ""}`}
                onClick={() => setBloomState(k)}
                aria-pressed={bloomState === k}
              >
                <span>{copy.stateEmoji[k]}</span>
                {copy.state[k]}
              </button>
            ))}
          </div>
        </div>

        <div className="step">
          <p className="field-label">
            <span>
              <span className="step-num">4</span>한마디
            </span>
            <span>{memo.length}/200</span>
          </p>
          <textarea
            rows={3}
            maxLength={200}
            placeholder="예: 담벼락을 따라 곱게 물들었어요"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        <p className="privacy-note">
          <span>🔒</span>
          <span>
            얼굴이 나온 사진은 올라가지 않아요. 사진의 위치·시간 정보(EXIF)는 업로드 전에
            지워지고, 핀은 약 10m 단위로 뭉개져 저장돼요. 개인 주택처럼 사생활 침해가
            우려되는 곳은 제보를 삼가주세요.
          </span>
        </p>

        {error && <p className="error">{error}</p>}

        <button className="btn primary" disabled={busy} onClick={submit}>
          {busy ? "사진 확인 중…" : "제보 올리기"}
        </button>
      </div>
    </div>
  );
}
