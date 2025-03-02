import { useEffect } from "react";
import { createPortal } from "react-dom";
import CompanyGraphInfo from "@/types/CompanyGraphInfo";
import Chat from "./Chat";

interface ChatModalProps {
  displayName: string;
  companyData: CompanyGraphInfo;
  onClose: () => void;
}

export default function ChatModal({
  displayName,
  companyData,
  onClose,
}: ChatModalProps) {
  useEffect(() => {
    // Prevent scrolling when modal is open
    const currentScroll = window.scrollY;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      // Restore scroll position
      window.scrollTo(0, currentScroll);
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[75] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-all"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white/95 w-[800px] h-[600px] rounded-xl shadow-xl backdrop-blur-sm flex flex-col">
        {/* Fixed Header with Close Button */}
        <div className="absolute top-0 right-0 p-4 z-50">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Chat Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Chat displayName={displayName} companyData={companyData} />
        </div>
      </div>
    </div>,
    document.body
  );
}
