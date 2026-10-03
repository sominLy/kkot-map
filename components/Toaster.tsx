"use client";

import { useEffect, useState } from "react";

export default function Toaster() {
  const [msg, setMsg] = useState<{ text: string; id: number } | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setMsg({ text: (e as CustomEvent<string>).detail, id: Date.now() });
      clearTimeout(timer);
      timer = setTimeout(() => setMsg(null), 2600);
    };
    window.addEventListener("kkotmap-toast", onToast);
    return () => {
      window.removeEventListener("kkotmap-toast", onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="toast-wrap" aria-live="polite" role="status">
      {msg && (
        <div key={msg.id} className="toast">
          {msg.text}
        </div>
      )}
    </div>
  );
}
