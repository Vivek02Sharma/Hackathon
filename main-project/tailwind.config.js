/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#889696", // Adding custom color with name 'custom-gray'
        "custom-gray-dark": "#0f0f0f"
      },
    },
  },
  plugins: [],
}
