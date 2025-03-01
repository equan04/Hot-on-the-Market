import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Function to initialize and return a database connection
export async function openDB(): Promise<Database> {
  return open({
    filename: './company_data.db', // SQLite database file
    driver: sqlite3.Database,
  });
}

import { NextRequest, NextResponse } from 'next/server';

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

const query : string = `
SELECT 
    name,
    json_group_array(assets) AS assets,
    json_group_array(liabilities) AS liabilities,
    json_group_array(stockholdersEquity) AS stockholdersEquity,
    json_group_array(revenue) AS revenue,
    json_group_array(netIncome) AS netIncome,
    json_group_array(opIncome) AS opIncome,
    json_group_array(compIncome) AS compIncome,
    json_group_array(epsBasic) AS epsBasic,
    json_group_array(epsDiluted) AS epsDiluted,
    json_group_array(commonStock) AS commonStock,
    json_group_array(year) AS year,
    json_group_array(quarter) AS quarter,
    isQuarterly
FROM financials
GROUP BY name, isQuarterly
WHERE name="MCDONALDS CORP"
ORDER BY year DESC, quarter DESC;
`

export async function GET() {
  const db = await openDB();
  const result = await db.all(query);
    const companyData: CompanyProp[] = result.map(row => ({
        name: row.name,
        assets: JSON.parse(row.assets) as number[], 
        liabilities: JSON.parse(row.liabilities) as number[],
        stockholdersEquity: JSON.parse(row.stockholdersEquity) as number[],
        revenue: JSON.parse(row.revenue) as number[],
        netIncome: JSON.parse(row.netIncome) as number[],
        opIncome: JSON.parse(row.opIncome) as number[],
        compIncome: JSON.parse(row.compIncome) as number[],
        epsBasic: JSON.parse(row.epsBasic) as number[],
        epsDiluted: JSON.parse(row.epsDiluted) as number[],
        commonStock: JSON.parse(row.commonStock) as number[],
        year: JSON.parse(row.year) as number[],
        quarter: JSON.parse(row.quarter) as number[],
        isQuarterly: row.isQuarterly === 1 // Convert SQLite boolean (0 or 1) to true/false
    }));

  return NextResponse.json(companyData, { status: 200 });
}