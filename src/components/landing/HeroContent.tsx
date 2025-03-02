"use client";

import { useState } from "react";
import CascadingText from "../effects/CascadingText";
import Button from "../ui/Button";

export default function HeroContent() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [showCascading, setShowCascading] = useState(true);

  const handleCascadingComplete = () => {
    setShowCascading(false);
    setShowMainContent(true);
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-6 pt-10 relative">
      {/* Cascading Text */}
      <div
        className={`absolute transition-opacity duration-500 ${
          showCascading ? "opacity-100" : "opacity-0"
        }`}
      >
        <CascadingText
          text="Hot on the Market 🔥"
          className="text-4xl sm:text-6xl font-bold leading-tight"
          onComplete={handleCascadingComplete}
        />
      </div>

      {/* Main Content */}
      <div className="text-center max-w-3xl">
        <div className="text-4xl sm:text-6xl font-bold leading-tight flex flex-col gap-2 whitespace-nowrap">
          <div
            className={`transition-all duration-500 ${
              showMainContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            Who Needs Love 💖
          </div>
          <div
            className={`transition-all duration-500 delay-[200ms] ${
              showMainContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            When You Have Money? 🤑
          </div>
        </div>
        <p
          className={`mt-4 text-lg transition-all duration-500 delay-[400ms] ${
            showMainContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          Swipe. Match. Invest. Discover the hottest companies looking for
          backers like you.
        </p>

        {/* Call-to-Action Buttons */}
        <div
          className={`mt-8 flex flex-row gap-4 items-center justify-center transition-all duration-500 delay-[600ms] ${
            showMainContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <Button variant="primary" href="/date">
            Get Started
          </Button>
          <Button variant="secondary" href="/about">
            Learn More
          </Button>
        </div>
      </div>
    </main>
  );
}
