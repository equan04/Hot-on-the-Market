"use client";

import { useState, useEffect } from "react";

interface RippleEffect {
  x: number;
  y: number;
  id: number;
}

interface ButtonProps {
  variant: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant,
  href,
  onClick,
  children,
  className = "",
}: ButtonProps) {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  useEffect(() => {
    const cleanup = ripples.reduce((acc, ripple) => {
      acc[ripple.id] = setTimeout(() => {
        setRipples((prevRipples) =>
          prevRipples.filter((r) => r.id !== ripple.id)
        );
      }, 1000);
      return acc;
    }, {} as { [key: number]: NodeJS.Timeout });

    return () => {
      Object.values(cleanup).forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [ripples]);

  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const ripple = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, ripple]);
    onClick?.();
  };

  const baseStyles =
    "font-semibold py-3 px-6 rounded-full text-lg shadow-md transition-all relative overflow-hidden";
  const variantStyles = {
    primary: "bg-white text-pink-500 hover:bg-gray-200",
    secondary:
      "bg-transparent border border-white text-white hover:bg-white hover:text-pink-500",
  };

  const ButtonContent = () => (
    <>
      <span className="relative z-10">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
            width: "200%",
            paddingBottom: "200%",
          }}
        />
      ))}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={createRipple}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        <ButtonContent />
      </a>
    );
  }

  return (
    <button
      onClick={createRipple}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <ButtonContent />
    </button>
  );
}
