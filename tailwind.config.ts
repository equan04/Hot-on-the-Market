import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        ripple: {
          "0%": { opacity: "0.5", transform: "translate(-50%, -50%) scale(0)" },
          "100%": { opacity: "0", transform: "translate(-50%, -50%) scale(2)" },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        ripple: "ripple 1s ease-out forwards",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config; 