/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: "rgb(229, 253, 255)",
        primary: "rgb(31, 199, 212)",
        inputText: "rgb(40, 13, 95)",
        cardBg: "rgb(231, 227, 235)",
      },
    },
  },
  plugins: [],
};
