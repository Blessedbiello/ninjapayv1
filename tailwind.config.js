/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#111111',
        card: '#18171c',
        element: '#201f26',
        primary: '#4b0082',
        secondary: '#9370db',
        accent: '#6441a5',
        'text-primary': '#ffffff',
        'text-secondary': '#7d7d7d',
        success: '#5cdb5c',
        error: '#ff6b6b',
      },
    },
  },
  plugins: [],
};