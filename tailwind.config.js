/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
  theme: {
    extend: {
      colors: {
        "accent-orange": "#f29602",
        "bookmarked-yellow": "#FDFCF4",
        "li-separator-gray": "#eff3f4",
        "main-black": "#08181A",
        "main-blue": "#38B2DC",
        "main-green": "#42ce9f",
        "sub-orange": "#f6a623",
      },
      fontFamily: {
        body: [
          "Avenir",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "Hiragino Sans",
          "ヒラギノ角ゴシック",
          "メイリオ",
          "Meiryo",
          "YuGothic",
          "Yu Gothic",
          "ＭＳ Ｐゴシック",
          "MS PGothic",
          "sans-serif",
        ],
        montserrat: ["var(--font-montserrat)"],
      },
    },
    // Mantineのブレークポイントと一致させる
    screens: {
      lg: "1200px",
      md: "992px",
      sm: "768px",
      xl: "1400px",
      xs: "620px",
    },
  },
};
