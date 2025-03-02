"use client";

import { useEffect, useState } from "react";

interface CascadingTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
  delayMs?: number;
  onComplete?: () => void;
}

export default function CascadingText({
  text,
  className,
  letterClassName,
  delayMs = 100,
  onComplete,
}: CascadingTextProps) {
  // Use Array.from to properly split Unicode characters including emojis
  const characters = Array.from(text);
  const [visibleLetters, setVisibleLetters] = useState<boolean[]>(
    new Array(characters.length).fill(false)
  );

  useEffect(() => {
    characters.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLetters((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
        if (index === characters.length - 1 && onComplete) {
          setTimeout(onComplete, 500);
        }
      }, index * delayMs);
    });
  }, [characters, delayMs, onComplete]);

  return (
    <div className={`flex flex-row ${className}`}>
      {characters.map((char, index) => (
        <span
          key={index}
          className={`${letterClassName} ${char === " " ? "mr-[0.5ch]" : ""}`}
          style={{
            transform: visibleLetters[index]
              ? "translateY(0)"
              : "translateY(-100%)",
            opacity: visibleLetters[index] ? 1 : 0,
            transitionProperty: "all",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "500ms",
            display: "inline-block", // Ensure emojis are treated as blocks
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
