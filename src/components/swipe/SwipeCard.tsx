"use client";

// SwipeCard.tsx
import React, { useState } from "react";
import CompanyModal from "../profile/CompanyModal";
import CompanyBlurb from "../company-info/CompanyBlurb";
import IndustryIcon from "../company-info/IndustryIcon";
import PercentChange from "../PercentChange";
import CompanyBasicInfo from "@/types/CompanyBasicInfo";

interface SwipeCardProps {
  company: CompanyBasicInfo;
  onSwipe: (direction: "left" | "right") => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ company, onSwipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          className="flex justify-between w-full px-4 mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onSwipe("left")}
            className="text-white bg-red-500 py-2 px-6 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition"
          >
            Reject
          </button>
          <button
            onClick={() => onSwipe("right")}
            className="text-white bg-green-500 py-2 px-6 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition"
          >
            Like
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
