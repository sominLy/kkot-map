// 어디서든 부를 수 있는 가벼운 토스트. <Toaster />가 이벤트를 받아 보여준다.
export function toast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("kkotmap-toast", { detail: message }));
}
