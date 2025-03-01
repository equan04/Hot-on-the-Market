import CompanyBasicInfo from "@/types/CompanyBasicInfo";
import Tooltip from "../Tooltip";
import { getAge } from "@/app/utils/getAge";

interface CompanyBlurbProps {
  company: CompanyBasicInfo;
  align?: "left" | "center";
}

export default function CompanyBlurb({
  company,
  align = "center",
}: CompanyBlurbProps) {
  return (
    <div className={`text-${align}`}>
      <h2 className="text-3xl font-extrabold text-gray-800 mb-1">
        {company.displayName}
      </h2>
      <div className="mb-4">
        <Tooltip text="This is my ticker symbol, which helps identify my stock on the market ;)">
          <p className="text-lg text-gray-600">
            Or you can call me {company.ticker} ;)
          </p>
        </Tooltip>{" "}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <div className="bg-gray-50 p-2 rounded-xl">
          <p className="font-semibold text-gray-600 mb-1">Age</p>
          <p className="text-gray-800">
            {getAge(company.yearIncorporated)} years
          </p>
        </div>

        <div className="bg-gray-50 p-2 rounded-xl">
          <p className="font-semibold text-gray-600 mb-1">Location</p>
          <p className="text-gray-800">{company.location || "McLean, VA"}</p>
        </div>

        <div className="bg-gray-50 p-2 rounded-xl">
          <p className="font-semibold text-gray-600 mb-1">Revenue</p>
          <p className="text-gray-800">${company.revenue.toLocaleString()}</p>
        </div>

        <div className="bg-gray-50 p-2 rounded-xl">
          <p className="font-semibold text-gray-600 mb-1">Stock Price</p>
          <p className="text-gray-800">${company.latestStockPrice}</p>
        </div>
      </div>
    </div>
  );
}
