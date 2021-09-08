const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ...defaultTheme.colors,
        background: "rgb(229, 253, 255)",
        primary: "rgb(31, 199, 212)",
        inputText: "rgb(40, 13, 95)",
        cardBg: "rgb(231, 227, 235)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
