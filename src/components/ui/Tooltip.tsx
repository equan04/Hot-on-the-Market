import React from "react";

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
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [tooltipStyle, setTooltipStyle] = React.useState<React.CSSProperties>(
    {}
  );
  const [arrowStyle, setArrowStyle] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    const updatePosition = () => {
      if (!tooltipRef.current || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const tooltip = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const tooltipWidth = tooltip.width;

      let style: React.CSSProperties = {};
      let arrow: React.CSSProperties = {
        position: "absolute",
        width: "8px",
        height: "8px",
        backgroundColor: "rgb(31, 41, 55)",
        transform: "rotate(45deg)",
      };

      // Handle horizontal positioning
      if (position === "bottom" || position === "top") {
        // Calculate if tooltip would overflow either side
        const centerOffset = container.width / 2;
        const wouldOverflowLeft =
          container.left + centerOffset - tooltipWidth / 2 < 0;
        const wouldOverflowRight =
          container.right - centerOffset + tooltipWidth / 2 > viewportWidth;

        if (wouldOverflowLeft) {
          // Align tooltip to left edge with small margin
          style = {
            left: "0px",
            transform: "translateX(0)",
          };
          // Position arrow relative to the trigger element
          const arrowOffset = container.left + container.width / 2;
          arrow = {
            ...arrow,
            left: `${arrowOffset}px`,
            marginLeft: "-4px",
          };
        } else if (wouldOverflowRight) {
          // Align tooltip to right edge with small margin
          style = {
            left: "100%",
            transform: "translateX(-100%)",
          };
          // Position arrow relative to the trigger element
          const arrowOffset =
            viewportWidth - container.right + container.width / 2;
          arrow = {
            ...arrow,
            right: `${arrowOffset}px`,
            marginRight: "-4px",
          };
        } else {
          // Center alignment
          style = {
            left: "50%",
            transform: "translateX(-50%)",
          };
          arrow = {
            ...arrow,
            left: "50%",
            marginLeft: "-4px",
          };
        }

        // Add vertical offset and arrow position
        if (position === "top") {
          style.bottom = "100%";
          style.marginBottom = "0.5rem";
          arrow.bottom = "-4px";
        } else {
          style.top = "100%";
          style.marginTop = "0.5rem";
          arrow.top = "-4px";
        }
      }

      setTooltipStyle(style);
      setArrowStyle(arrow);
    };

    updatePosition();
    const observer = new MutationObserver(updatePosition);

    if (tooltipRef.current) {
      observer.observe(tooltipRef.current, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [position]);

  return (
    <div className="group relative inline-block" ref={containerRef}>
      {children}
      <div
        ref={tooltipRef}
        style={tooltipStyle}
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
      >
        <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap relative">
          {text}
          <div style={arrowStyle} />
        </div>
      </div>
    </div>
  );
}
