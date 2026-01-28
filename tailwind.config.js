/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgg: "#161616",
        dborder: "#2a2a2a",
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};
