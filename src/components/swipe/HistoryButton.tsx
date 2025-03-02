import { History } from "lucide-react";
import { useEffect, useRef } from "react";

interface HistoryButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function HistoryButton({ onClick, isOpen }: HistoryButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      // Check if click is outside both button and modal
      if (
        isOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        // Check if the click is not inside the modal
        !target.closest(".history-modal")
      ) {
        onClick();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClick]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={
        "fixed top-[75px] right-6 z-20 p-3 rounded-full shadow-lg transition-all duration-300 mb-4 bg-white hover:bg-gray-100"
      }
      aria-label="View History"
      aria-expanded={isOpen}
    >
      <History
        className={`w-6 h-6 ${isOpen ? "text-blue-500" : "text-gray-600"}`}
      />
    </button>
  );
}
