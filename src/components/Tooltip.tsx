interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  text,
  children,
  position = "bottom",
}: TooltipProps) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "-bottom-1 left-1/2 -translate-x-1/2 rotate-45",
    bottom: "-top-1 left-1/2 -translate-x-1/2 rotate-45",
    left: "-right-1 top-1/2 -translate-y-1/2 rotate-45",
    right: "-left-1 top-1/2 -translate-y-1/2 rotate-45",
  };

  return (
    <div className="group relative inline-block">
      {children}
      <div
        className={`absolute ${positionClasses[position]} opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50`}
      >
        <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full whitespace-nowrap">
          {text}
          <div
            className={`absolute ${arrowClasses[position]} w-2 h-2 bg-gray-800`}
          />
        </div>
      </div>
    </div>
  );
}
