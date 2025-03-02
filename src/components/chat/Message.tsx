import React from "react";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  message: Message;
}

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  id?: string;
}
interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}


const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        message.role === "user"
          ? "bg-blue-100 ml-auto max-w-[80%]"
          : "bg-gray-100 mr-auto max-w-[80%]"
      }`}
    >
      {/* <div className="font-bold mb-1">
        {message.role === "user" ? "You" : "Claude"}
      </div> */}
      <div className="prose prose-sm">
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MessageComponent;