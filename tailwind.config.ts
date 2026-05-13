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
        accent: '#B85C2A',
        'accent-light': '#D4874A',
        gold: '#F5C87A',
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#141414',
        'bg-tertiary': '#1c1c1e',
        'bg-card': '#181818',
        'border-primary': '#2a2a2a',
        'border-secondary': '#3a3a3a',
        'text-primary': '#f0f0f0',
        'text-secondary': '#a0a0a0',
        'text-tertiary': '#606060',
        'dial-pos': '#4a8c1c',
        'dial-pos-bg': 'rgba(74,140,28,0.15)',
        'dial-neg': '#c23535',
        'dial-neg-bg': 'rgba(194,53,53,0.15)',
      },
      fontFamily: {
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}

export default config
