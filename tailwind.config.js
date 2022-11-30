/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        button_dark: "#272727",
        button_dark_hover: "#333",

        button_light: "#ddd",
        button_light_hover: "#d1d1d1",
      },
    },
  },
  plugins: [],
};
