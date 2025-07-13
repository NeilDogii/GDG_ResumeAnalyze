"use client";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

export default function Popup({
  children,
  showPopup,
  className = "",
  closeButtonClassName = "",
  onChangeShowPopup
}: {
  children: ReactNode;
  showPopup: boolean;
  className?: string;
  closeButtonClassName?: string;
  onChangeShowPopup: (showPopup: boolean) => void;
}) {
  useEffect(() => {
    if (showPopup) {
      const scrollbarWidth =
        window.innerWidth -
        document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      const handleKeyDown = (
        event: globalThis.KeyboardEvent
      ) => {
        if (event.key === "Escape") {
          onChangeShowPopup(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        document.removeEventListener(
          "keydown",
          handleKeyDown
        );
      };
    }
  }, [onChangeShowPopup, showPopup]);

  return (
    <div
      role="button"
      aria-label="Popup Overlay"
      onClick={() => {
        onChangeShowPopup(false);
      }}
      className={`fixed bottom-0 left-0 z-50 flex h-dvh w-dvw items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-100 ease-in-out ${
        showPopup
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        role="button"
        aria-label="Popup Content"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`relative z-50 bg-white transition-all duration-300 max-sm:w-dvw max-sm:self-end max-sm:rounded-t-3xl max-sm:px-3 max-sm:pt-7 max-sm:pb-3 sm:min-w-[450px] sm:duration-100 ${
          showPopup
            ? "max-sm:translate-y-0 sm:scale-100"
            : "max-sm:translate-y-full sm:scale-90"
        } p-4 sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl ${className || ""}`}
      >
        <X
          width={32}
          height={32}
          onClick={() => {
            onChangeShowPopup(false);
          }}
          className={`absolute -top-10 right-1/2 z-50 cursor-pointer rounded-full p-1.5 max-sm:translate-x-1/2 max-sm:bg-black/30 max-sm:text-white/80 sm:top-1 sm:right-1 sm:scale-75 sm:p-1 ${
            closeButtonClassName || ""
          }`}
        />
        <div className="max-h-[95vh] overflow-auto py-2">
          {children}
        </div>
      </div>
    </div>
  );
}