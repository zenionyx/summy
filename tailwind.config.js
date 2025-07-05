/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        "mm-green": "#90dd6f",
        "mm-yellow": "#F2C94C",
        "mm-orange": "#FFA248",
        "mm-blue": "#52A6E4",
        "mm-pink": "#F898B7",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
