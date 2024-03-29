/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cloud-bg': "url('./src/assets/bg.jpg')",
        'partly-cloud': "url('./assets/videos/partly-cloud.mp4')"
      }
    },
  },
  plugins: [],
}