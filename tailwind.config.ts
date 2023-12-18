import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        backgroundImage: {
          'military-transparent': "url('/assets/images/theme/background.png')",
          'military': "url('/assets/images/theme/background2.png')",
          'icon-bg': "url('/assets/images/theme/icon-bg.png')",
        },
        colors: {
          'primary': '#3A4D39',
          'secondary': '#ECE3CE',
        },
        boxShadow: {
          'custom': '0 4px 10px 0px rgba(0,0,0,0.25)',
        },
        fontFamily: {
          'work-sans': ['Work Sans', 'sans-serif'],
        }
    },
  },
  plugins: [],
}
export default config

