/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "567px",
        md: "768px",
        lg: "920px",
        xl: "1200px",
        "2xl": "1380px",
      },
    },
    extend: {
      colors: {
        primary: "#0aad0a",
      },
      fontFamily: {
        Encode: "Encode Sans Expanded",
        cairo: `"Cairo", sans-serif`,
      },
    },
  },
  plugins: [],
};
