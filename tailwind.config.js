/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#050505',
          900: '#080808',
          850: '#0D0D0D',
          800: '#121212',
          750: '#171717',
          700: '#1F1F1F',
          600: '#2A2A2A',
          500: '#3F3F46',
          400: '#71717A',
          300: '#A1A1AA',
          200: '#E4E4E7',
          100: '#F4F4F5',
          50: '#FAFAFA',
        },
        luxe: {
          bone: '#F6F5F2',
          smoke: '#E8E6E1',
          silver: '#C5C7CC',
          gold: '#C5A880',
          champagne: '#E5D5C5',
          crimson: '#9E2A2B'
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        editorial: ['Italiana', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.25em',
        widest: '0.18em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
    },
  },
  plugins: [],
}
