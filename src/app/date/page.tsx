"use client"
import CompanyProfile from "@/components/CompanyProfile";
import CompanyBasicInfo from "@/types/CompanyBasicInfo";
import CompanyGraphInfo from "@/types/CompanyGraphInfo";
import SwipeDeck from "@/components/Swipedeck";

const dummyCompanyBasicData: CompanyBasicInfo = {
    name: "Capital One",
    ticker: "COF",
    yearOfIncorporation: 1994,
    industry: "",
    revenue: 0,
    ytdPercentChange: 0,
    latestStockPrice: 0,
    percentChange: 0
}

const dummyCompanyGraphData: CompanyGraphInfo = {
  name: "Company XYZ",
  assets: [1000, 1200, 1500, 1800, 2100],
  liabilities: [500, 600, 700, 800, 900],
  stockholdersEquity: [500, 600, 800, 1000, 1200],
  revenue: [200, 250, 300, 350, 400],
  netIncome: [50, 60, 70, 80, 90],
  opIncome: [150, 170, 190, 210, 230],
  compIncome: [150, 160, 170, 180, 190],
  epsBasic: [1.2, 1.3, 1.5, 1.6, 1.7],
  epsDiluted: [1.1, 1.2, 1.3, 1.4, 1.5],
  commonStock: [500, 520, 550, 580, 600],
  year: [2021, 2022, 2023, 2024, 2025],
  quarter: [1, 2, 3, 4, 1],
  isQuarterly: true,
};

// export default function Home() {
//     return (
//         <CompanyProfile basicInfo={dummyCompanyBasicData} graphInfo={dummyCompanyGraphData}/>
//     );
// }


export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <SwipeDeck />
    </div>
  );
}

