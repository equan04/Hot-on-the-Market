import { useState } from "react";
import CompanyGraphInfo from "@/types/CompanyGraphInfo";
import ChatModal from "./ChatModal";
import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  displayName: string;
  companyData: CompanyGraphInfo;
}

export default function ChatButton({
  displayName,
  companyData,
}: ChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-blue-500 hover:bg-blue-600 text-white p-3 shadow-lg transition-colors duration-200 cursor-pointer"
        aria-label="Chat with Company"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      {isOpen && (
        <ChatModal
          displayName={displayName}
          companyData={companyData}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
