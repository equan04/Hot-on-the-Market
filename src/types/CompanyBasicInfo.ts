type CompanyBasicInfo = {
    name: string;
    displayName: string;
    ticker: string;
    yearIncorporated: number;
    industry: string;
    location: string;
    revenue: number;
    latestStockPrice: number;
    percentChange: number;  
    imageUrl: string;
    rejectImageUrl?: string;
    caption: string;
}

export default CompanyBasicInfo;