"use client";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal(props: ModalProps) {
  const close = props.onClose;
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [props]);

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="position-fixed top-0 left-0 w-full h-full bg-[rgba(33,37,41,0.6)] flex items-center justify-center z-[1000]"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#ffffff] p-6 rounded-lg max-w-[500px] w-full relative shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
        <button
          className="absolute top-4 right-4 text-[24px] leading-none hover:bg-[#f0f0f0] rounded-full w-[30px] h-[30px] flex items-center justify-center"
          onClick={close}
          aria-label="Close modal"
        >
          ×
        </button>
        {props.children}
      </div>
    </div>,
    document.body,
  );
}