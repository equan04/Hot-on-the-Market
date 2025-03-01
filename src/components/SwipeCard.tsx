"use client";

// SwipeCard.tsx
import React from "react";

interface Company {
  ticker: string;
  companyName: string;
  yearIncorporated: number;
  industry: string;
  revenue: string;
  stockPrice: string;
  percentChange: string;
  imageUrl: string;
  caption: string;
}

interface SwipeCardProps {
  company: Company;
  onSwipe: (direction: "left" | "right") => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ company, onSwipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-72 flex flex-col items-center">
      <img src={company.imageUrl} alt={company.companyName} className="w-40 h-40 object-contain mb-4" />
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{company.companyName}</h3>
      <div className="text-sm text-gray-600 mb-4">
        <p><strong>Ticker:</strong> {company.ticker}</p>
        <p><strong>Year:</strong> {company.yearIncorporated}</p>
        <p><strong>Industry:</strong> {company.industry}</p>
        <p><strong>Revenue:</strong> ${company.revenue}</p>
        <p><strong>Stock Price:</strong> ${company.stockPrice}</p>
        <p><strong>Change:</strong> {company.percentChange}%</p>
      </div>
      <p className="italic text-center text-gray-500 mb-6">{company.caption}</p>
      <div className="flex justify-between w-full">
        <button
          onClick={() => onSwipe("left")}
          className="text-white bg-red-500 py-2 px-4 rounded-full w-20"
        >
          Reject
        </button>
        <button
          onClick={() => onSwipe("right")}
          className="text-white bg-green-500 py-2 px-4 rounded-full w-20"
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default SwipeCard;
