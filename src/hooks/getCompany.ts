import { useState, useEffect } from 'react';
import CompanyGraphInfo from '@/types/CompanyGraphInfo';

interface UseCompanyResult {
  data: CompanyGraphInfo | null;
  isLoading: boolean;
  error: Error | null;
}

export function useCompany(companyName: string): UseCompanyResult {
  const [data, setData] = useState<CompanyGraphInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log(`[API Request] Fetching data for company: ${companyName}`);
        const response = await fetch(`/api/database?company=${encodeURIComponent(companyName)}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`[API Error] Failed to fetch company data:
            Status: ${response.status}
            Status Text: ${response.statusText}
            URL: ${response.url}
            Error Details: ${errorText}
          `);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log(`[API Success] Received data for company: ${companyName}`);
        
        if (!result) {
          console.error(`[API Error] No data found for company: ${companyName}`);
          throw new Error(`Company "${companyName}" not found`);
        }
        
        setData(result);
      } catch (err) {
        console.error('[API Error] Detailed error:', {
          error: err,
          message: err instanceof Error ? err.message : 'Unknown error',
          stack: err instanceof Error ? err.stack : undefined,
          company: companyName
        });
        setError(err instanceof Error ? err : new Error('An error occurred while fetching company data'));
      } finally {
        setIsLoading(false);
      }
    };

    if (companyName) {
      fetchCompany();
    }
  }, [companyName]);

  return { data, isLoading, error };
}
