/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#11212D",
        teal: "#0A7075",
        mint: "#6BA3BE",
        sand: "#F1EBD8",
        ember: "#D94E41"
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
