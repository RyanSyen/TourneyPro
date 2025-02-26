import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      // },
      colors: {
        primary: "#4F46E5",
        secondary: "#6366F1",
        accent: "#EC4899",
        muted: "#9CA3AF",
        background: "#F3F4F6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)",
        "button-hover": "0 2px 4px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
    plugins: [
      plugin(function ({
        addUtilities,
      }: {
        addUtilities: (
          utilities: Record<string, any>,
          variants?: string[]
        ) => void;
      }) {
        const newUtilities = {
          ".text-balance": {
            "text-wrap": "balance",
          },
          ".no-scrollbar": {
            "::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          },
        };
        addUtilities(newUtilities, ["responsive", "hover"]);
      }),
    ],
  },
  plugins: [],
} satisfies Config;
