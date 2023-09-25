/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#F9F9FB",
        "text-primary":"#FB5857",
        "graybasic": "#B3B3BC;",
        "textbasicgray": "#787887",
        "iconsgray":"#B3B3BC",
        "orangered":"#FF5349",
        "universal-primary": "#FB5857",
        "grey": "#9ca3af",
        "black-rgba": "rgba(0, 0, 0, 0.8)",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};



