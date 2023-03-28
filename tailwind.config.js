/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Mantineのブレークポイントと一致させる
    screens: {
      xs: "576px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1400px",
    },
    extend: {
      colors: {
        "li-separator-gray": "#eff3f4",
        "main-green": "#42ce9f",
        "main-blue": "#38B2DC",
        "sub-orange": "#f6a623",
        "accent-orange": "#f29602",
        "main-black": "#08181A",
        "bookmarked-yellow": "#FDFCF4"
      },
      fontFamily: {
        body: [
          'Avenir',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'Hiragino Sans',
          'ヒラギノ角ゴシック',
          'メイリオ',
          'Meiryo',
          'YuGothic',
          'Yu Gothic',
          'ＭＳ Ｐゴシック',
          'MS PGothic',
          'sans-serif'
        ],
        montserrat: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
};
