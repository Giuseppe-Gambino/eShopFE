/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontSize: {
        sm: "0.750rem",
        base: "1rem",
        xl: "1.333rem",
        "2xl": "1.777rem",
        "3xl": "2.369rem",
        "4xl": "3.158rem",
        "5xl": "4.210rem",
      },
      fontFamily: {
        heading: "Inter",
        body: "Inter",
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
    },
  },
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
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        darktheme: {
          primary: "#CAF7ED",
          secondary: "#202431",
          accent: "#0093FF",
          neutral: "#171A26",
          "base-100": "#171A26",
          info: "#8DA7C3",
          success: "#CAF7ED",
          warning: "#FACC15",
          error: "#F87171",
        },
      },
      {
        themewhite: {
          primary: "#007AFF", // Blu Apple-style
          secondary: "#F0F3F7", // Grigio chiaro elegante
          accent: "#FF3B30", // Rosso acceso
          neutral: "#FFFFFF", // Bianco puro
          "base-100": "#F9FAFB", // Bianco sporco per sfondi
          info: "#5AC8FA", // Azzurro chiaro
          success: "#34C759", // Verde acceso
          warning: "#FF9500", // Arancione Apple-style
          error: "#FF3B30", // Rosso Apple-style
        },
      },
    ],
    darkTheme: "darktheme", // Tema predefinito in modalità scura
  },
};
