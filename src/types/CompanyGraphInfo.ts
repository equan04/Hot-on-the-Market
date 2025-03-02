export default interface CompanyGraphInfo {
    name: string;
    accumulatedOtherComprehensiveIncomeLoss: number[];
    adjustmentsToAdditionalPaidInCapital: number[];
    assets: number[];
    cashAndCashEquivalents: number[];
    cashAndRestrictedCash: number[];
    commonStockShares: number[];
    comprehensiveIncome: number[];
    debtSecurities: number[];
    earningsPerShareBasic: number[];
    earningsPerShareDiluted: number[];
    incomeLossBeforeTax: number[];
    incomeTaxExpense: number[];
    liabilities: number[];
    netIncome: number[];
    operatingIncome: number[];
    provisionForLoanLosses: number[];
    revenueFromContracts: number[];
    revenues: number[];
    stockholdersEquity: number[];
    fy: number[];
    fp: string[];
}