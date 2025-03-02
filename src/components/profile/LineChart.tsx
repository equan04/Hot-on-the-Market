"use client";

import dynamic from "next/dynamic";
import "chart.js/auto";
import CompanyGraphInfo from "@/types/CompanyGraphInfo";
import { useMemo, useState } from "react";
import { ChartOptions } from "chart.js";
import { TooltipItem } from "chart.js";

interface LineChartProps {
  companyData: CompanyGraphInfo;
}

const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

type Tab = "revenue" | "income" | "balance" | "cash";

// Format large numbers to billions with 2 decimal places
const formatToBillions = (value: number) => {
  const billion = 1000000000;
  if (Math.abs(value) >= billion) {
    return `$${(value / billion).toFixed(2)}B`;
  }
  const million = 1000000;
  if (Math.abs(value) >= million) {
    return `$${(value / million).toFixed(2)}M`;
  }
  return `$${value.toFixed(2)}`;
};

const LineChart = ({ companyData }: LineChartProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("revenue");

  // Create labels from fiscal year and period
  const labels = useMemo(() => {
    if (!companyData?.fy || !companyData?.fp) {
      console.error("[LineChart] Missing fy or fp data");
      return [];
    }
    return companyData.fy.map(
      (year, index) => `${companyData.fp[index]} ${year}`
    );
  }, [companyData?.fy, companyData?.fp]);

  // Helper function to check if dataset has any non-null values
  const hasData = (data: (number | null)[] | undefined) => {
    return data && data.some((value) => value !== null && value !== undefined);
  };

  // Revenue metrics
  const revenueData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: `Total Revenues`,
          data: companyData?.revenues || [],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: `Revenue from Contracts`,
          data: companyData?.revenueFromContracts || [],
          fill: false,
          borderColor: "rgb(153, 102, 255)",
          tension: 0.1,
        },
      ],
    }),
    [labels, companyData?.revenues, companyData?.revenueFromContracts]
  );

  // Income metrics
  const incomeData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: `Net Income`,
          data: companyData?.netIncome || [],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: `Operating Income`,
          data: companyData?.operatingIncome || [],
          fill: false,
          borderColor: "rgb(153, 102, 255)",
          tension: 0.1,
        },
        {
          label: `Comprehensive Income`,
          data: companyData?.comprehensiveIncome || [],
          fill: false,
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1,
        },
      ],
    }),
    [
      labels,
      companyData?.netIncome,
      companyData?.operatingIncome,
      companyData?.comprehensiveIncome,
    ]
  );

  // Balance sheet metrics
  const balanceSheetData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: `Assets`,
          data: companyData?.assets || [],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: `Liabilities`,
          data: companyData?.liabilities || [],
          fill: false,
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1,
        },
        {
          label: `Stockholders Equity`,
          data: companyData?.stockholdersEquity || [],
          fill: false,
          borderColor: "rgb(153, 102, 255)",
          tension: 0.1,
        },
      ],
    }),
    [
      labels,
      companyData?.assets,
      companyData?.liabilities,
      companyData?.stockholdersEquity,
    ]
  );

  // Cash metrics
  const cashData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: `Cash and Cash Equivalents`,
          data: companyData?.cashAndCashEquivalents || [],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: `Cash and Restricted Cash`,
          data: companyData?.cashAndRestrictedCash || [],
          fill: false,
          borderColor: "rgb(153, 102, 255)",
          tension: 0.1,
        },
      ],
    }),
    [
      labels,
      companyData?.cashAndCashEquivalents,
      companyData?.cashAndRestrictedCash,
    ]
  );

  // Chart options to prevent re-renders
  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0, // Disable animations to prevent re-renders
      },
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            font: {
              family: "'Poppins', Arial, Helvetica, sans-serif",
            },
          },
        },
        tooltip: {
          titleFont: {
            family: "'Poppins', Arial, Helvetica, sans-serif",
          },
          bodyFont: {
            family: "'Poppins', Arial, Helvetica, sans-serif",
          },
          callbacks: {
            label: (context: TooltipItem<"line">) => {
              const label = context.dataset.label || "";
              const value = context.parsed.y;
              return `${label}: ${formatToBillions(value)}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: "'Poppins', Arial, Helvetica, sans-serif",
            },
            callback: function (value) {
              return formatToBillions(Number(value));
            },
          },
          title: {
            font: {
              family: "'Poppins', Arial, Helvetica, sans-serif",
            },
          },
        },
        x: {
          ticks: {
            font: {
              family: "'Poppins', Arial, Helvetica, sans-serif",
            },
          },
          title: {
            font: {
              family: "'Poppins', Arial, Helvetica, sans-serif",
            },
          },
        },
      },
    }),
    []
  );

  if (!companyData) {
    return <div>No data available</div>;
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "revenue", label: "Revenue Metrics" },
    { id: "income", label: "Income Metrics" },
    { id: "balance", label: "Balance Sheet" },
    { id: "cash", label: "Cash Position" },
  ];

  const getActiveChart = () => {
    switch (activeTab) {
      case "revenue":
        return {
          data: revenueData,
          title: "Revenue Metrics",
          hasData:
            hasData(companyData.revenues) ||
            hasData(companyData.revenueFromContracts),
        };
      case "income":
        return {
          data: incomeData,
          title: "Income Metrics",
          hasData:
            hasData(companyData.netIncome) ||
            hasData(companyData.operatingIncome) ||
            hasData(companyData.comprehensiveIncome),
        };
      case "balance":
        return {
          data: balanceSheetData,
          title: "Balance Sheet Metrics",
          hasData:
            hasData(companyData.assets) ||
            hasData(companyData.liabilities) ||
            hasData(companyData.stockholdersEquity),
        };
      case "cash":
        return {
          data: cashData,
          title: "Cash Position",
          hasData:
            hasData(companyData.cashAndCashEquivalents) ||
            hasData(companyData.cashAndRestrictedCash),
        };
    }
  };

  const activeChart = getActiveChart();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center">Financial Overview</h1>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative py-2 px-4 text-sm font-medium rounded-t-lg cursor-pointer
              ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }
              before:absolute before:bottom-[-2px] before:left-0 before:h-0.5
              before:bg-blue-600 before:transition-all before:duration-300 before:ease-out
              ${activeTab === tab.id ? "before:w-full" : "before:w-0"}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{activeChart.title}</h2>
        <div
          style={{ height: "400px" }}
          className="flex items-center justify-center"
        >
          {activeChart.hasData ? (
            <Line data={activeChart.data} options={options} />
          ) : (
            <div className="text-gray-500 text-lg">No metrics found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LineChart;
