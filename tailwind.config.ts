import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "sans-serif"],
      },
      colors: {
        brand: {
          lime: "#B2DF28",
          green: "#00FF80",
          red: "#FF1E00",
          gray: "#2C2E30",
          silver: "#292B2D",
          "light-blue": "#0AD7F1",
          "dirty-blue": "#0AD7F10A",
          "caption-gray": "#989898",
          "light-gray": "#3B3D3F",
        },
      },
    },
  },
} satisfies Config;
