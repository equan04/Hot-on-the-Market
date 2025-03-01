import {
  Building2,
  Computer,
  GraduationCap,
  Store,
  Car,
  Film,
  MessageSquare,
  Home,
  ShoppingCart,
  LucideIcon,
} from "lucide-react";

import { Hamburger, Pill } from "phosphor-react";
import Tooltip from "../Tooltip";

interface IndustryIconProps {
  industry: string;
  className?: string;
}

const industryIconMap: Record<string, LucideIcon> = {
  "Financial Services": Building2,
  "Information Technology": Computer,
  "Education Technology": GraduationCap,
  "Fast Food Restaurants": Hamburger,
  "Discount Stores": Store,
  "Automotive and Energy": Car,
  Entertainment: Film,
  "Retail-Drug Stores": Pill,
  "Business Services": MessageSquare,
  "Travel Services": Home,
  "Internet Retail": ShoppingCart,
};

export default function IndustryIcon({
  industry,
  className = "",
}: IndustryIconProps) {
  const Icon = industryIconMap[industry] || Building2;

  return (
    <Tooltip text={`Industry: ${industry}`} position="bottom">
      <div className={`rounded-full bg-gray-100 p-2 ${className}`}>
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
    </Tooltip>
  );
}
