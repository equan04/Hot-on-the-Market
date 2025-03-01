import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { NextResponse } from "next/server";
import path from "path";

const query = `
SELECT 
    name,
    json_group_array(AccumulatedOtherComprehensiveIncomeLossNetOfTax) as accumulatedOtherComprehensiveIncomeLoss,
    json_group_array(AdjustmentsToAdditionalPaidInCapitalSharebasedCompensationRequisiteServicePeriodRecognitionValue) as adjustmentsToAdditionalPaidInCapital,
    json_group_array(Assets) as assets,
    json_group_array(CashAndCashEquivalentsAtCarryingValue) as cashAndCashEquivalents,
    json_group_array(CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents) as cashAndRestrictedCash,
    json_group_array(CommonStockSharesOutstanding) as commonStockShares,
    json_group_array(ComprehensiveIncomeNetOfTax) as comprehensiveIncome,
    json_group_array(DebtSecuritiesAvailableForSaleExcludingAccruedInterest) as debtSecurities,
    json_group_array(EarningsPerShareBasic) as earningsPerShareBasic,
    json_group_array(EarningsPerShareDiluted) as earningsPerShareDiluted,
    json_group_array(IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest) as incomeLossBeforeTax,
    json_group_array(IncomeTaxExpenseBenefit) as incomeTaxExpense,
    json_group_array(Liabilities) as liabilities,
    json_group_array(NetIncomeLoss) as netIncome,
    json_group_array(OperatingIncomeLoss) as operatingIncome,
    json_group_array(ProvisionForLoanLossesExpensed) as provisionForLoanLosses,
    json_group_array(RevenueFromContractWithCustomerExcludingAssessedTax) as revenueFromContracts,
    json_group_array(Revenues) as revenues,
    json_group_array(StockholdersEquity) as stockholdersEquity,
    json_group_array(fy) as fy,
    json_group_array(fp) as fp
FROM company_data
WHERE name = ?
GROUP BY name
ORDER BY fy DESC, fp DESC;
`;

// Return db connection
export async function openDB(): Promise<Database> {
  try {
    const dbPath = path.join(
      process.cwd(),
      "src",
      "app",
      "data",
      "company_data.db"
    );
    console.log("[Database] Attempting to connect to:", dbPath);

    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    console.log("[Database] Successfully opened connection");
    return db;
  } catch (err) {
    console.error("[Database] Error opening database:", err);
    throw err;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyName = searchParams.get("company");

    if (!companyName) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    console.log("[API] Attempting to connect to database");
    const db = await openDB();

    // Log the tables in the database
    const tables = await db.all(
      `SELECT name FROM sqlite_master WHERE type='table'`
    );
    console.log("[Database] Available tables:", tables);

    console.log("[API] Executing query for company:", companyName);
    const result = await db.all(query, [companyName]);
    console.log("[API] Query result:", result);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: `No data found for company: ${companyName}` },
        { status: 404 }
      );
    }

    const companyData = result.map((row) => {
      // Parse JSON strings back to arrays for each field
      const parseJsonArray = (str: string) => JSON.parse(str || "[]");

      return {
        name: row.name,
        accumulatedOtherComprehensiveIncomeLoss: parseJsonArray(
          row.accumulatedOtherComprehensiveIncomeLoss
        ),
        adjustmentsToAdditionalPaidInCapital: parseJsonArray(
          row.adjustmentsToAdditionalPaidInCapital
        ),
        assets: parseJsonArray(row.assets),
        cashAndCashEquivalents: parseJsonArray(row.cashAndCashEquivalents),
        cashAndRestrictedCash: parseJsonArray(row.cashAndRestrictedCash),
        commonStockShares: parseJsonArray(row.commonStockShares),
        comprehensiveIncome: parseJsonArray(row.comprehensiveIncome),
        debtSecurities: parseJsonArray(row.debtSecurities),
        earningsPerShareBasic: parseJsonArray(row.earningsPerShareBasic),
        earningsPerShareDiluted: parseJsonArray(row.earningsPerShareDiluted),
        incomeLossBeforeTax: parseJsonArray(row.incomeLossBeforeTax),
        incomeTaxExpense: parseJsonArray(row.incomeTaxExpense),
        liabilities: parseJsonArray(row.liabilities),
        netIncome: parseJsonArray(row.netIncome),
        operatingIncome: parseJsonArray(row.operatingIncome),
        provisionForLoanLosses: parseJsonArray(row.provisionForLoanLosses),
        revenueFromContracts: parseJsonArray(row.revenueFromContracts),
        revenues: parseJsonArray(row.revenues),
        stockholdersEquity: parseJsonArray(row.stockholdersEquity),
        fy: parseJsonArray(row.fy),
        fp: parseJsonArray(row.fp),
      };
    });

    return NextResponse.json(companyData[0] || null, { status: 200 });
  } catch (error) {
    console.error("[API] Detailed error:", {
      error,
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
