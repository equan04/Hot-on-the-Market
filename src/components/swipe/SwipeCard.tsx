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
}

const SwipeCard: React.FC<SwipeCardProps> = ({ company, onSwipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onSwipe("left");
      } else if (event.key === "ArrowRight") {
        onSwipe("right");
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [onSwipe]);

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
          src={company.imageUrl}
          alt={company.name}
          className="w-32 h-32 object-contain mb-2"
        />

        <div className="w-full">
          <CompanyBlurb company={company} />
        </div>

        <div
          className="flex flex-row gap-4 items-center justify-center w-full px-4 mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onSwipe("left")}
            className="text-white bg-red-500 p-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition not-only: cursor-pointer"
          >
            <X />
          </button>
          <button
            onClick={() => onSwipe("right")}
            className="text-white bg-green-500 p-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition cursor-pointer"
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
