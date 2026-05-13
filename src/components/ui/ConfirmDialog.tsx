"use client";

import { useEffect, useRef } from "react";

type ConfirmDialogProps = {
  open: boolean;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-describedby="confirm-msg"
        className="relative w-full max-w-sm border border-[#121212] bg-white p-6 shadow-lg animate-scale-in"
      >
        <p id="confirm-msg" className="text-sm leading-relaxed text-[#121212]">
          {message}
        </p>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            className="h-10 flex-1 bg-[#121212] text-sm font-medium text-white transition-colors hover:bg-black active:scale-[0.98]"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
          <button
            ref={cancelRef}
            type="button"
            className="h-10 flex-1 border border-[#121212] bg-white text-sm text-[#121212] transition-colors hover:bg-zinc-50 active:scale-[0.98]"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
