// 
// CompanyProfile.tsx
import { useLocation } from 'react-router-dom';

const CompanyProfile = () => {
  const location = useLocation();
  const { company } = location.state; // Get the company passed from the previous page

  return (
    <div className="p-4">
      <h1>{company.companyName}</h1>
      <img src={company.imageUrl} alt={company.companyName} className="w-40 h-40 object-cover" />
      <p><strong>Year Incorporated:</strong> {company.yearIncorporated}</p>
      <p><strong>Revenue:</strong> ${company.revenue}</p>
      <p><strong>Stock Price:</strong> ${company.stockPrice}</p>
      <p><strong>Change:</strong> {company.percentChange}%</p>
      <p>{company.caption}</p>
    </div>
  );
};

export default CompanyProfile;
