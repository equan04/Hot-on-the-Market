"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 50,
  className = "",
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Reset when text changes
    setDisplayText("");
    setIsTyping(true);

    // Ensure text is a string and handle any undefined cases
    const safeText = typeof text === "string" ? text : "";

    // Split text into array of characters, properly handling emojis and special characters
    const characters = [...safeText];

    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < characters.length) {
        const nextChar = characters[currentIndex];
        console.log("Adding character:", nextChar);
        setDisplayText((prev) => prev + nextChar);
        currentIndex++;
        setTimeout(typeText, speed);
      } else {
        setIsTyping(false);
      }
    };

    const timeout = setTimeout(typeText, speed);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, speed]);

  return (
    <span className={className}>
      {displayText}
      {isTyping && <span className="animate-pulse ml-0.5">|</span>}
    </span>
  );
}
