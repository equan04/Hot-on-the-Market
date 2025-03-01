"use client";

import dynamic from "next/dynamic";
import "chart.js/auto";
import CompanyGraphInfo from "@/types/CompanyGraphInfo";

interface LineChartProps {
  companyData: CompanyGraphInfo;
}

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const LineChart = ({ companyData }: LineChartProps) => {
  // Assuming you're plotting one of the metrics (e.g., revenue)
  const revenueData = {
    labels: companyData.year.map(
      (year, index) => `Q${companyData.quarter[index]} ${year}`
    ),
    datasets: [
      {
        label: `Revenue of ${companyData.name}`,
        data: companyData.revenue,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      // You can add more datasets for other metrics like assets, liabilities, etc.
    ],
  };

  const incomeData = {
    labels: companyData.year.map(
      (year, index) => `Q${companyData.quarter[index]} ${year}`
    ),
    datasets: [
      {
        label: `Net Income of ${companyData.name}`,
        data: companyData.netIncome,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: `Operational Income of ${companyData.name}`,
        data: companyData.opIncome,
        fill: false,
        borderColor: "rgb(175, 192, 192)",
        tension: 0.1,
      },
      {
        label: `Comprehensive Income of ${companyData.name}`,
        data: companyData.compIncome,
        fill: false,
        borderColor: "rgb(275, 192, 192)",
        tension: 0.1,
      },
      // You can add more datasets for other metrics like assets, liabilities, etc.
    ],
  };

  return (
    <div style={{ width: "700px", height: "700px" }}>
      <h1>Financial Overview: {companyData.name}</h1>
      <Line data={revenueData} />
      <Line data={incomeData} />
    </div>
  );
};

export default LineChart;
