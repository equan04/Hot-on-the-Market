type CompanyGraphInfo = {
    name: string;
    assets: number[];
    liabilities: number[];
    stockholdersEquity: number[]; 
    revenue: number[];
    netIncome: number[];
    opIncome: number[];
    compIncome: number[];
    epsBasic: number[];
    epsDiluted: number[];
    commonStock: number[];
    year: number[];
    quarter: number[];
    isQuarterly: boolean
}

export default CompanyGraphInfo;