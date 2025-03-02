import Tooltip from "../ui/Tooltip";

interface PercentChangeProps {
  value: number;
  className?: string;
}

export default function PercentChange({
  value,
  className = "",
}: PercentChangeProps) {
  const isPositive = value >= 0;
  const tooltipText = `YTD Change: ${isPositive ? "+" : ""}${value}%`;

  return (
    <Tooltip text={tooltipText} position="bottom">
      <p
        className={`${
          isPositive ? "text-green-600" : "text-red-600"
        } font-semibold ${className}`}
      >
        {isPositive && "+"}
        {value}%
      </p>
    </Tooltip>
  );
}
