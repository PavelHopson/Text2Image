import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#05070A',
          50: '#f8f9fa',
          100: '#0C1117',
          200: '#111820',
          300: '#162032',
          400: '#0A0E14',
          500: '#05070A',
        },
        accent: {
          DEFAULT: '#6BA3FF',
          light: '#9DC4FF',
          dark: '#4A7FD4',
        },
        neon: {
          blue: '#6BA3FF',
          purple: '#9DC4FF',
          pink: '#9DC4FF',
          green: '#4AE6A0',
        },
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
