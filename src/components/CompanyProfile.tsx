"use client"
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Heart, X, TrendingUp, Users, Building2, DollarSign, ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";
import { companies } from "src/data/companies";
export const CompanyProfile = () => {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const company = companies.find(c => c.id === id);
  if (!company) {
    return <Navigate to="/" replace />;
  }
  const metrics = [{
    label: "Market Cap",
    value: company.marketCap
  }, {
    label: "Revenue",
    value: company.revenue
  }, {
    label: "Growth Rate",
    value: company.growthRate
  }, {
    label: "Employees",
    value: company.employees
  }];
  return <main className="w-full min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
      <button onClick={() => navigate("/")} className="fixed top-4 left-4 z-10 bg-white p-2 rounded-full shadow-lg flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden md:inline">Back to Discovery</span>
      </button>
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[45%] relative">
            <div className="relative h-80 md:h-[600px] bg-gray-200">
              <img src={company.imageUrl} alt={`${company.name} headquarters`} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-white/90 p-2 rounded-full">
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button className="bg-white/90 p-2 rounded-full">
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-[55%] p-6 md:p-12">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {company.name}
              </h1>
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-gray-500" />
                <span className="text-gray-600 text-lg">
                  {company.industry}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              {metrics.map(metric => <div key={metric.label} className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {metric.value}
                  </p>
                </div>)}
            </div>
            <p className="mt-8 text-gray-600 leading-relaxed text-lg">
              {company.description}
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-green-600 text-lg">
                <TrendingUp className="w-6 h-6" />
                <span>{company.highlights.customerGrowth}</span>
              </div>
              <div className="flex items-center gap-3 text-blue-600 text-lg">
                <Users className="w-6 h-6" />
                <span>{company.highlights.retentionRate}</span>
              </div>
              <div className="flex items-center gap-3 text-purple-600 text-lg">
                <DollarSign className="w-6 h-6" />
                <span>{company.highlights.revenue}</span>
              </div>
            </div>
            <div className="flex gap-6 mt-12">
              <button className="flex-1 bg-red-500 text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-red-600 transition-colors text-lg">
                <X className="w-6 h-6" />
                Pass
              </button>
              <button className="flex-1 bg-green-500 text-white py-4 rounded-full flex items-center justify-center gap-2 hover:bg-green-600 transition-colors text-lg">
                <Heart className="w-6 h-6" />
                Interested
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>;
};