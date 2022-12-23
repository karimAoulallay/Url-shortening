/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../**/*.html"],
  theme: {
    extend: {
      colors: {
        neutralLight: "hsl(0, 0%, 95%)",
        neutralDark: "hsl(257, 7%, 63%)",
        primaryColor: "hsl(180, 66%, 49%)",
        secondaryColor: "hsl(257, 27%, 26%)",
        titleColor: "hsl(255, 11%, 22%)",
        footerColor: "hsl(260, 8%, 14%)",
        errorColor: "hsl(0, 87%, 67%)",
        neutral: "white",
      },
    },
  },
  plugins: [],
};
