export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  marketCap: string;
  revenue: string;
  growthRate: string;
  employees: string;
  imageUrl: string;
  highlights: {
    customerGrowth: string;
    retentionRate: string;
    revenue: string;
  };
}