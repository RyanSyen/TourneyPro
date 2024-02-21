"use client";

import { useRouter } from "next/navigation";
import { type ElementRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="modal-backdrop absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-[1000]">
      <dialog
        ref={dialogRef}
        className="modal w-4/5 max-w-lg h-auto max-h-[512px] border-none rounded-xl bg-white p-5 relative flex justify-center items-center text-5xl font-medium"
        onClose={onDismiss}
      >
        {children}
        <button
          onClick={onDismiss}
          className="close-button absolute top-3 right-3 w-12 h-12 bg-transparent border-none rounded-2xl cursor-pointer flex justify-center items-center font-medium text-2xl hover:bg-[#eee] text-sky-400 after:content['x'] after:text-black"
        />
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
}
