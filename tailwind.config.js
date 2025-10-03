/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    screens: {
      sm: "320px", // small phones
      md: "375px", // medium phones (iPhone X, Pixel 5, etc.)
      lg: "414px", // big phones (iPhone Plus, Pro Max)
      xl: "600px", // small tablets
      "2xl": "768px", // tablets
    },
  },
  plugins: [],
};
