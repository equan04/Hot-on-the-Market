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

    let currentIndex = 0;
    const typeText = () => {
      if (currentIndex < text.length) {
        setDisplayText((prev) => prev + text[currentIndex]);
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
