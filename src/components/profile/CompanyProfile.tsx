"use client";

import CompanyBasicInfo from "@/types/CompanyBasicInfo";
import LineChart from "./LineChart";
import { useCompany } from "@/hooks/getCompany";
import { useEffect } from "react";

interface CompanyProfileProps {
  basicInfo: CompanyBasicInfo;
}

const CompanyProfile = ({ basicInfo }: CompanyProfileProps) => {
  const { data, isLoading, error } = useCompany(basicInfo.name);

  useEffect(() => {
    console.log("[CompanyProfile] Hook State:", {
      data,
      isLoading,
      error,
      companyName: basicInfo.name,
    });
  }, [data, isLoading, error, basicInfo.name]);

  if (isLoading) return <div>Loading financial data...</div>;
  if (error) {
    console.error("[CompanyProfile Error]", {
      error,
      companyName: basicInfo.name,
      timestamp: new Date().toISOString(),
    });
    return <div>Error loading financial data</div>;
  }
  if (!data) return <div>No financial data found</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {data && <LineChart companyData={data} />}
    </div>
  );
};

export default CompanyProfile;
