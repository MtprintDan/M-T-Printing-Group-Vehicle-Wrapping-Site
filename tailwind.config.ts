import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CMYK accent palette
        cyan: {
          DEFAULT: "#00AEEF",
          50: "#E6F7FD",
          100: "#CCF0FB",
          500: "#00AEEF",
          600: "#0099D4",
        },
        magenta: {
          DEFAULT: "#EC008C",
          50: "#FDE6F4",
          100: "#FBCCE9",
          500: "#EC008C",
          600: "#D0007D",
        },
        yellow: {
          DEFAULT: "#FFD700",
          accent: "#F5C400",
        },
        brand: {
          black: "#0A0A0A",
          gray: "#6B7280",
          light: "#F9F9F9",
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
