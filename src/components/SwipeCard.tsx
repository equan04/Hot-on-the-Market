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
    <div className="bg-white rounded-3xl shadow-2xl p-10 w-[450px] flex flex-col items-center space-y-6 mt-12">
    <img 
      src={company.imageUrl} 
      alt={company.companyName} 
      className="w-48 h-48 object-contain mb-4"
    />
    <h3 className="text-3xl font-extrabold text-gray-800">{company.companyName}</h3>
    
    <div className="text-lg text-gray-700 space-y-2 text-center">
      <p><strong>Ticker:</strong> {company.ticker}</p>
      <p><strong>Year:</strong> {company.yearIncorporated}</p>
      <p><strong>Industry:</strong> {company.industry}</p>
      <p><strong>Revenue:</strong> ${company.revenue}</p>
      <p><strong>Stock Price:</strong> ${company.stockPrice}</p>
      <p><strong>YTD Change:</strong> {company.percentChange}%</p>
    </div>

    <p className="italic text-xl text-gray-500 text-center px-4">{company.caption}</p>

    <div className="flex justify-between w-full px-6 mt-4">
      <button
        onClick={() => onSwipe("left")}
        className="text-white bg-red-500 py-3 px-6 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition"
      >
        Reject
      </button>
      <button
        onClick={() => onSwipe("right")}
        className="text-white bg-green-500 py-3 px-6 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition"
      >
        Like
      </button>
    </div>
  </div>
);
};

export default SwipeCard;