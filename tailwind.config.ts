import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'airbnb-red': '#E31C5F',
        'airbnb-dark': '#222222',
        'airbnb-gray': '#717171',
        'airbnb-border': '#DDDDDD',
        'airbnb-light': '#F7F7F7',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
