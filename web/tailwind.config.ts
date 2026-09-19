import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F0E6",
        "paper-deep": "#EBE3D3",
        forest: "#20301F",
        "forest-800": "#2A3B27",
        moss: "#5E6E4E",
        sage: "#9AA786",
        amber: "#C98A3C",
        "amber-bright": "#E0A04C",
        clay: "#A65A38",
        ink: "#1B211A",
        cream: "#F7F3EA",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-instrument)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.28em",
      },
      maxWidth: {
        edge: "1440px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.12)" },
        },
        "draw-in": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slow-zoom": "slow-zoom 24s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
