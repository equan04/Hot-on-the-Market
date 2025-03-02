import { X, Heart } from "lucide-react";
import CompanyBasicInfo from "@/types/CompanyBasicInfo";
import CompanyModal from "../profile/CompanyModal";
import { useState } from "react";

interface CompanyRowProps {
  company: CompanyBasicInfo;
  onSwipeUpdate: (companyName: string, direction: "left" | "right") => void;
  showRejectButton?: boolean;
  onCompanyClick: (company: CompanyBasicInfo) => void;
}

interface HistoryModalProps {
  isOpen: boolean;
  favorites: string[];
  rejects: string[];
  companies: CompanyBasicInfo[];
  onSwipeUpdate: (companyName: string, direction: "left" | "right") => void;
}

export default function HistoryModal({
  isOpen,
  favorites,
  rejects,
  companies,
  onSwipeUpdate,
}: HistoryModalProps) {
  const [selectedCompany, setSelectedCompany] =
    useState<CompanyBasicInfo | null>(null);

  const CompanyRow = ({
    company,
    showRejectButton,
    onSwipeUpdate,
    onCompanyClick,
  }: CompanyRowProps) => (
    <div
      className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
      onClick={(e) => {
        // Prevent click from bubbling to parent elements
        e.stopPropagation();
        onCompanyClick(company);
      }}
    >
      <div className="flex items-center gap-3">
        <img
          src={company.imageUrl}
          alt={company.name}
          className="w-10 h-10 object-contain"
        />
        <span className="font-medium text-sm">{company.displayName}</span>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSwipeUpdate(company.name, showRejectButton ? "left" : "right");
          }}
          className={`text-white p-1.5 rounded-full text-sm shadow-lg transform hover:scale-105 transition cursor-pointer ${
            showRejectButton ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {showRejectButton ? (
            <X className="w-3.5 h-3.5" />
          ) : (
            <Heart className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`history-modal fixed top-32 right-6 w-[300px] max-w-md bg-white rounded-lg shadow-2xl z-10 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-3 border-b border-gray-500 bg-white sticky top-0">
          <h2 className="text-lg font-bold text-center">Swipe History</h2>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-48px)]">
          {/* Favorites Section */}
          <div className="p-3">
            <h3 className="text-base font-semibold mb-2 text-green-600">
              Favorites ❤️
            </h3>
            <div className="border border-gray-500 rounded-lg overflow-hidden">
              {favorites.map((name) => {
                const company = companies.find((c) => c.name === name);
                return company ? (
                  <CompanyRow
                    key={name}
                    company={company}
                    onSwipeUpdate={onSwipeUpdate}
                    showRejectButton={true}
                    onCompanyClick={setSelectedCompany}
                  />
                ) : null;
              })}
              {favorites.length === 0 && (
                <div className="p-3 text-gray-500 text-center text-sm">
                  No favorites yet
                </div>
              )}
            </div>
          </div>

          {/* Rejects Section */}
          <div className="px-3 pb-3">
            <h3 className="text-base font-semibold mb-2 text-red-600 sticky top-0">
              Rejects 💔
            </h3>
            <div className="border border-gray-500 rounded-lg overflow-hidden">
              {rejects.map((name) => {
                const company = companies.find((c) => c.name === name);
                return company ? (
                  <CompanyRow
                    key={name}
                    company={company}
                    onSwipeUpdate={onSwipeUpdate}
                    showRejectButton={false}
                    onCompanyClick={setSelectedCompany}
                  />
                ) : null;
              })}
              {rejects.length === 0 && (
                <div className="p-3 text-gray-500 text-center text-sm">
                  No rejects yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedCompany && (
        <CompanyModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </>
  );
}
