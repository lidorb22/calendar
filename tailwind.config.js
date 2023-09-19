/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        peachRed: "#ef3636",
        litepink: "#FFE2E2",
        brownBlack: "#241515",
        thirty: "#2C2C2C",
        ten: "#E5901A",
        danger: "#F53D3D",
      },
    },
  },
  plugins: [],
};
