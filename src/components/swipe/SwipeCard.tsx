"use client";

import React, { useState, useEffect } from "react";
import CompanyModal from "../profile/CompanyModal";
import CompanyBlurb from "../company-info/CompanyBlurb";
import IndustryIcon from "../company-info/IndustryIcon";
import PercentChange from "../company-info/PercentChange";
import CompanyBasicInfo from "@/types/CompanyBasicInfo";
import { Heart, X } from "lucide-react";

interface SwipeCardProps {
  company: CompanyBasicInfo;
  onSwipe: (direction: "left" | "right") => void;
  isAnimating: boolean;
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  company,
  onSwipe,
  isAnimating,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isAnimating) {
        if (event.key === "ArrowLeft") {
          handleSwipe("left");
        } else if (event.key === "ArrowRight") {
          handleSwipe("right");
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onSwipe, isAnimating]);

  const handleSwipe = (direction: "left" | "right") => {
    if (isAnimating) return;

    if (direction === "left") {
      setIsRejected(true);
      setImageError(false);

      if (company.rejectImageUrl) {
        setTimeout(() => onSwipe(direction), 1000);
      } else {
        onSwipe(direction);
      }
    } else {
      onSwipe(direction);
    }
  };

  // Determine which image URL to use
  const imageUrl =
    isRejected && company.rejectImageUrl && !imageError
      ? company.rejectImageUrl
      : company.imageUrl;

  return (
    <>
      <div
        className="bg-white rounded-3xl shadow-2xl p-6 w-[450px] flex flex-col items-center cursor-pointer transform hover:scale-[1.02] transition-transform relative"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Industry Icon and YTD Change */}
        <div className="absolute top-4 right-4 flex flex-col items-end">
          <IndustryIcon industry={company.industry} />
          <div className="mt-2">
            <PercentChange value={company.percentChange} className="text-lg" />
          </div>
        </div>

        <img
          src={imageUrl}
          alt={company.name}
          className="w-32 h-32 object-contain mb-2 transition-opacity duration-300"
          onError={() => {
            setImageError(true);
            console.warn(`Failed to load image: ${imageUrl}`);
          }}
        />

        <div className="w-full">
          <CompanyBlurb company={company} />
        </div>

        <div
          className="flex flex-row gap-4 items-center justify-center w-full px-4 mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleSwipe("left")}
            disabled={isAnimating}
            className={`text-white bg-red-500 p-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition ${
              isAnimating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <X />
          </button>
          <button
            onClick={() => handleSwipe("right")}
            disabled={isAnimating}
            className={`text-white bg-green-500 p-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition ${
              isAnimating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <Heart />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <CompanyModal company={company} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default SwipeCard;
