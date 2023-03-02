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
      }
    },
  },
  plugins: [],
};
