/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors: {
        'primary': '#22C55E',
        'dark': "#1E293B",
        'light': "#F1F5F9",
        'accent': "#38BDF8",
        'background':"#F8F9FD" 
      }
    },
  },
  plugins: [],
}