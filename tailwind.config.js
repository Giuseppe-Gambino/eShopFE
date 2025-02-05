/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "600px",
        md: "778px",
        lg: "984px",
        xl: "1240px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["sunset", "fantasy"], // Scegli i temi disponibili
    darkTheme: "sunset", // Tema predefinito per dark mode
  },
};
