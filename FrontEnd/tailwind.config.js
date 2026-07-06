/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        finscrybe: {
          primary: '#635BFF',
          hover: '#5448F7',
          bg: '#F8FAFC',
          text: '#111827',
          muted: '#6B7280',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
