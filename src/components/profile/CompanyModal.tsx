import { useEffect } from "react";
import { createPortal } from "react-dom";
import CompanyBasicInfo from "@/types/CompanyBasicInfo";
import Tooltip from "../Tooltip";
import IndustryIcon from "../company-info/IndustryIcon";
import LineChart from "./LineChart";
import { useCompany } from "@/hooks/getCompany";
import { getAge } from "@/app/utils/getAge";

interface CompanyModalProps {
  company: CompanyBasicInfo;
  onClose: () => void;
}

export default function CompanyModal({ company, onClose }: CompanyModalProps) {
  const { data: companyGraphData, isLoading } = useCompany(company.name);

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full h-full overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 bg-white rounded-full p-2 shadow-lg text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Two Column Layout */}
        <div className="flex h-full">
          {/* Left Column - Company Info */}
          <div className="w-1/2 p-20 space-y-8">
            <img
              src={company.imageUrl}
              alt={company.displayName}
              className="w-96 h-96 object-contain object-left"
            />

            <div className="w-full">
              <div className="flex items-center mb-3">
                <h2 className="text-5xl font-bold text-gray-800">
                  {company.displayName}
                </h2>
                <div className="ml-4">
                  <IndustryIcon
                    industry={company.industry}
                    className="scale-125"
                  />
                </div>
              </div>
              <div className="mb-8">
                <Tooltip text="This is my ticker symbol, which helps identify my stock on the market ;)">
                  <p className="text-2xl text-gray-600">
                    Or you can call me {company.ticker} ;)
                  </p>
                </Tooltip>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 w-[500px] text-base">
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="font-semibold text-gray-600 mb-2">Age</p>
                <p className="text-gray-800">
                  {getAge(company.yearIncorporated)}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="font-semibold text-gray-600 mb-2">Revenue</p>
                <p className="text-gray-800">
                  ${company.revenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="font-semibold text-gray-600 mb-2">Stock Price</p>
                <p className="text-gray-800">${company.latestStockPrice}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="font-semibold text-gray-600 mb-2">YTD Change</p>
                <p
                  className={`${
                    company.percentChange >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  } font-semibold`}
                >
                  {company.percentChange}%
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Caption and Chart */}
          <div className="w-1/2 p-20 space-y-8">
            <p className="text-2xl text-gray-600 italic">
              &quot;{company.caption}&quot;
            </p>
            <div className="bg-white rounded-xl shadow-lg p-8">
              {isLoading ? (
                <div>Loading...</div>
              ) : companyGraphData ? (
                <LineChart companyData={companyGraphData} />
              ) : (
                <div>No data available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
