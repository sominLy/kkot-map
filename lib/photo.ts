import * as faceapi from "face-api.js";

let modelLoaded = false;

async function ensureModel() {
  if (modelLoaded) return;
  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  modelLoaded = true;
}

/**
 * 업로드 전 사진 검사·정제 파이프라인.
 * 1) 얼굴이 감지되면 업로드 거부 (프라이버시 보호)
 * 2) 캔버스로 재인코딩해 EXIF(GPS·촬영시각 등) 메타데이터를 완전 제거
 * 3) 긴 변 1600px로 리사이즈해 용량 절약
 *
 * @returns 정제된 JPEG Blob. 얼굴이 있으면 에러를 던짐.
 */
export async function sanitizePhoto(file: File): Promise<Blob> {
  await ensureModel();

  const img = await loadImage(file);

  const detections = await faceapi.detectAllFaces(
    img,
    new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.4 })
  );
  if (detections.length > 0) {
    throw new Error(
      "사진에 사람 얼굴이 감지되어 업로드할 수 없어요. 꽃만 나온 사진으로 다시 시도해주세요."
    );
  }

  const MAX = 1600;
  const scale = Math.min(1, MAX / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  URL.revokeObjectURL(img.src);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("이미지 변환 실패"))),
      "image/jpeg",
      0.85
    );
  });
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("이미지를 읽을 수 없어요"));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * 주거지 특정 방지를 위한 좌표 뭉개기: 소수 4자리(~11m)로 반올림.
 */
export function fuzzCoord(v: number): number {
  return Math.round(v * 10000) / 10000;
}
