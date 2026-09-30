import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fafafa",
        surface: "#ffffff",
        zinc: {
          950: "#09090b",
        },
        primary: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
        },
        destructive: "#ef4444",
        border: "#09090b",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #09090b",
        "brutal-sm": "2px 2px 0px 0px #09090b",
        "brutal-lg": "6px 6px 0px 0px #09090b",
        "brutal-accent": "4px 4px 0px 0px #2563eb",
      },
      borderWidth: {
        brutal: "2px",
        "brutal-thick": "3px",
      },
    },
  },
  plugins: [],
};
export default config;
