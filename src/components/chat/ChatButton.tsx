import { useState } from "react";
import CompanyGraphInfo from "@/types/CompanyGraphInfo";
import ChatModal from "./ChatModal";
import { MessageCircle } from "lucide-react";

interface ChatButtonProps {
  companyData: CompanyGraphInfo;
}

export default function ChatButton({ companyData }: ChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-blue-500 hover:bg-blue-600 text-white p-3 shadow-lg transition-colors duration-200"
        aria-label="Chat with Company"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      {isOpen && (
        <ChatModal companyData={companyData} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
