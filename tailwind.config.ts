import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pizza-black": "#0a0a0a",
        "pizza-cream": "#f0e6d3",
        "pizza-amber": "#c8843a",
        "pizza-walnut": "#2a1c14",
        "pizza-sand": "#f4ede1",
        "pizza-linen": "#e9ddc7",
        "pizza-ink": "#2c1810",
        "pizza-clay": "#9c5a1c",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
