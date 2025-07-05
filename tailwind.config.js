/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      boxShadow: {
        "up-sm": "0 -1px 2px 0 rgb(0 0 0 / 0.05)",
        up: "0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1)",
        "up-md":
          "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)",
        "up-lg":
          "0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 -4px 6px -4px rgb(0 0 0 / 0.1)",
        "up-xl":
          "0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1)",
        "up-2xl": "0 -25px 50px -12px rgb(0 0 0 / 0.25)",
      },
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
