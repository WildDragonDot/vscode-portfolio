"use client";
import { useEffect, useState } from "react";
import { X, CheckCircle, Info, AlertTriangle } from "lucide-react";

export type Toast = {
  id: string;
  type: "info" | "success" | "warning";
  title: string;
  message: string;
};

const ICONS = {
  info:    <Info size={14} className="text-vs-accent shrink-0 mt-0.5" />,
  success: <CheckCircle size={14} className="text-vs-cyan shrink-0 mt-0.5" />,
  warning: <AlertTriangle size={14} className="text-[#dcdcaa] shrink-0 mt-0.5" />,
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slide in
    const t1 = setTimeout(() => setVisible(true), 10);
    // Auto dismiss after 4s
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 350);
    }, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [toast.id, onRemove]);

  return (
    <div
      className={`flex items-start gap-3 bg-vs-bg2 border border-vs-border rounded-lg px-4 py-3 shadow-2xl max-w-[320px] transition-all duration-300 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
    >
      {ICONS[toast.type]}
      <div className="flex-1 min-w-0">
        <p className="text-vs-text text-[12px] font-semibold font-mono">{toast.title}</p>
        <p className="text-vs-muted text-[11px] font-mono mt-0.5 leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onRemove(toast.id), 350); }}
        className="text-vs-muted hover:text-vs-text transition-colors shrink-0"
      >
        <X size={12} />
      </button>
    </div>
  );
}

export default function Notifications({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed bottom-8 right-4 z-40 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
}
