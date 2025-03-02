import { createPortal } from "react-dom";
import CompanyBasicInfo from "@/types/CompanyBasicInfo";
import Tooltip from "../ui/Tooltip";
import IndustryIcon from "../company-info/IndustryIcon";
import LineChart from "./LineChart";
import { useCompany } from "@/hooks/getCompany";
import { getAge } from "@/app/utils/getAge";
import TypewriterText from "../effects/TypewriterText";
import ChatButton from "../chat/ChatButton";
import { Flag } from "lucide-react";
import risks from "@/data/risks.json";

type CompanyRisk = {
  name: string;
  "risk 1": string;
  "risk 2": string;
  "risk 3": string;
  "risk 4": string;
  "risk 5": string;
};

interface CompanyModalProps {
  company: CompanyBasicInfo;
  onClose: () => void;
}

export default function CompanyModal({ company, onClose }: CompanyModalProps) {
  const { data: companyGraphData, isLoading } = useCompany(company.name);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full h-full">
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

        {/* Scrollable Container */}
        <div className="h-full overflow-y-auto">
          {/* Two Column Layout */}
          <div className="flex min-h-full">
            {/* Left Column - Company Info */}
            <div className="w-1/2 pl-20 py-12">
              <img
                src={company.imageUrl}
                alt={company.displayName}
                className="w-[200px] h-[200px] object-contain object-left"
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
                <div className="bg-gray-50 p-2 rounded-xl">
                  <p className="font-semibold text-gray-600 mb-2">Age</p>
                  <p className="text-gray-800">
                    {getAge(company.yearIncorporated)}
                  </p>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl">
                  <p className="font-semibold text-gray-600 mb-2">Revenue</p>
                  <p className="text-gray-800">
                    ${company.revenue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl">
                  <p className="font-semibold text-gray-600 mb-2">
                    Stock Price
                  </p>
                  <p className="text-gray-800">${company.latestStockPrice}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl">
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

              {/* Risk Section */}
              <div className="mt-8 bg-gray-50 p-4 rounded-xl w-[500px]">
                <div className="flex items-center gap-2 mb-4">
                  <Flag className="w-5 h-5 text-red-500" />
                  <h3 className="font-semibold text-gray-700">Red Flags</h3>
                </div>
                <div className="space-y-2">
                  {risks.find((r: CompanyRisk) => r.name === company.ticker) &&
                    Array.from({ length: 5 }, (_, i) => i + 1).map((num) => {
                      const riskKey = `risk ${num}` as keyof CompanyRisk;
                      const companyRisks = risks.find(
                        (r: CompanyRisk) => r.name === company.ticker
                      );
                      return (
                        <div key={num} className="text-sm text-gray-600 pl-7">
                          {companyRisks?.[riskKey]}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Right Column - Caption and Chart */}
            <div className="w-1/2 p-20 space-y-8">
              <p className="text-2xl text-gray-600 italic">
                &quot;
                <TypewriterText text={company.caption} />
                &quot;
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

        {/* Floating Chat Button */}
        <div className="fixed bottom-8 right-8">
          {companyGraphData && (
            <ChatButton
              displayName={company.displayName}
              companyData={companyGraphData}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
