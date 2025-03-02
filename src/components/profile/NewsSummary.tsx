"use client";

import { ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import Tooltip from "../ui/Tooltip";
import news from "@/data/news.json";

interface NewsSummaryProps {
  companyName: string;
}

export default function NewsSummary({ companyName }: NewsSummaryProps) {
  console.log("news", news);
  const companyNews = news.find((n) => n.name === companyName);

  if (!companyNews) {
    return <div>No news data available</div>;
  }

  const {
    positive_percentage,
    negative_percentage,
    neutral_percentage,
    most_positive_url,
    most_negative_url,
    neutral_url,
  } = companyNews;

  return (
    <div className="w-full">
      {/* Labels */}
      <div className="flex mb-2">
        <div style={{ width: `${positive_percentage}%` }}>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-600">
                Positive
              </span>
              <a
                href={most_positive_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Tooltip text="Click to view most positive article">
                  <ThumbsUp className="w-4 h-4 text-green-500" />
                </Tooltip>
              </a>
            </div>
            <span className="text-sm text-gray-500">
              {positive_percentage}%
            </span>
          </div>
        </div>
        <div style={{ width: `${neutral_percentage}%` }}>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-600">Neutral</span>
              <a
                href={neutral_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Tooltip text="Click to view most neutral article">
                  <Minus className="w-4 h-4 text-gray-500" />
                </Tooltip>
              </a>
            </div>
            <span className="text-sm text-gray-500">{neutral_percentage}%</span>
          </div>
        </div>
        <div style={{ width: `${negative_percentage}%` }}>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-600">
                Negative
              </span>
              <a
                href={most_negative_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Tooltip text="Click to view most negative article">
                  <ThumbsDown className="w-4 h-4 text-red-500" />
                </Tooltip>
              </a>
            </div>
            <span className="text-sm text-gray-500">
              {negative_percentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Bars */}
      <div className="flex h-4 rounded-lg overflow-hidden">
        <div
          className="bg-green-500"
          style={{ width: `${positive_percentage}%` }}
        />
        <div
          className="bg-gray-400"
          style={{ width: `${neutral_percentage}%` }}
        />
        <div
          className="bg-red-500"
          style={{ width: `${negative_percentage}%` }}
        />
      </div>
    </div>
  );
}
