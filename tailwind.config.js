/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {},
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "tap-highlight": "rgba(0, 0, 0, 0.1)", // Customize your highlight color here
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".focus\\:tap-highlight": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0.1)", // Customize your highlight color here
        },
      };

      addUtilities(newUtilities, ["focus"]);
    },
  ],
};
