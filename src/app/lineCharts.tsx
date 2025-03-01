"use client"

import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'chart.js/auto';

interface CompanyProp {
    name: string,
    assets: number[],
    liabilities: number[],
    stockholdersEquity: number[], 
    revenue: number[],
    netIncome: number[],
    opIncome: number[],
    compIncome: number[],
    epsBasic: number[],
    epsDiluted: number[],
    commonStock: number[],
    year: number[],
    quarter: number[],
    isQuarterly: boolean
}

interface LineChartProps {
    companyData: CompanyProp;
}


const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false,
});

const LineChart = ({ companyData }: LineChartProps) => {

// Assuming you're plotting one of the metrics (e.g., revenue)
const revenueData = {
    labels: companyData.year.map((year, index) => `Q${companyData.quarter[index]} ${year}`),
    datasets: [
    {
        label: `Revenue of ${companyData.name}`,
        data: companyData.revenue,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
    },
    // You can add more datasets for other metrics like assets, liabilities, etc.
    ],
};

const incomeData = {
    labels: companyData.year.map((year, index) => `Q${companyData.quarter[index]} ${year}`),
    datasets: [
    {
        label: `Net Income of ${companyData.name}`,
        data: companyData.netIncome,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
    },
    {
        label: `Operational Income of ${companyData.name}`,
        data: companyData.opIncome,
        fill: false,
        borderColor: 'rgb(175, 192, 192)',
        tension: 0.1,
    },
    {
        label: `Comprehensive Income of ${companyData.name}`,
        data: companyData.compIncome,
        fill: false,
        borderColor: 'rgb(275, 192, 192)',
        tension: 0.1,
    },
    // You can add more datasets for other metrics like assets, liabilities, etc.
    ],
};

    return (
        <div style={{ width: '700px', height: '700px' }}>
        <h1>Financial Overview: {companyData.name}</h1>
        <Line data={revenueData} />
        <Line data={incomeData} />
        {/* <Line data={data} />
        <Line data={data} /> */}
        </div>
    );
};

export default LineChart;

// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May'],
//   datasets: [
//     {
//       label: 'GeeksforGeeks Line Chart',
//       data: [65, 59, 80, 81, 56],
//       fill: false,
//       borderColor: 'rgb(75, 192, 192)',
//       tension: 0.1,
//     },
//   ],
// };
// const LineChart = () => {
//   return (
//     <div style={{ width: '700px', height: '700px' }}>
//       <h1>Example 1: Line Chart</h1>
//       <Line data={data} />
//     </div>
//   );
// };
// export default LineChart;