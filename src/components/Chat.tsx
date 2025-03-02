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
  
  // File: src/components/Chat.tsx
  import React, { useState, useEffect, useRef } from "react";
  
  import MessageComponent from "./Message";
  import ChatInput from "./ChatInput";
  import CompanyGraphInfo from "../types/CompanyGraphInfo"
  
  export default function Chat(companyData: CompanyGraphInfo) {
    // const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
  
    const [messages, setMessages] = useState<Message[]>([
      {
        role: "system",  // Add system message when component loads
        content: `Hello, you are the dating profile of ${companyData.name}. You are presenting yourself as an investment, not goods to be purchased. Emulate a dating profile while sharing information about your company including things like why a user would want to invest in you, what your issues are etc. Also, keep the following data in your database and answer any questions the user has about them. ${companyData}`,
        id: Date.now().toString(),
      },
    ]);

    // Scroll to bottom of messages
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    const sendMessage = async (content: string) => {
      if (!content.trim()) return;
  
      const userMessage: Message = {
        role: "user",
        content,
        id: Date.now().toString(),
      };
  
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to get response");
        }
  
        const data = await response.json();
        
        // Add assistant message
        const assistantMessage: Message = {
          role: "assistant",
          content: data.content[0].text,
          id: Date.now().toString(),
        };
  
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        setError("Error communicating with Claude API. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 my-8">
              Start a conversation with Claude!
            </div>
          ) : (
            messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))
          )}
          {isLoading && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-pulse text-gray-500">Claude is thinking...</div>
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center py-2">{error}</div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    );
  };
  