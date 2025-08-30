import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F2E3D',
        },
        secondary: {
          DEFAULT: '#103C5A',
        },
        accent: {
          DEFAULT: '#FF7A1A',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1F2937',
          900: '#0B1220'
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem'
      }
    }
  },
  plugins: []
}

export default config;