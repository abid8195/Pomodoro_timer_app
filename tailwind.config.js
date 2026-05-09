/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        surface: {
          50: '#f8fafc',
          100: '#1e1e2e',
          200: '#2a2a3c',
          300: '#363650',
          400: '#4a4a62',
        },
        accent: {
          DEFAULT: '#a78bfa',
          dim: '#7c5ce7',
          bright: '#c4b5fd',
          glow: 'rgba(167, 139, 250, 0.25)',
        },
        success: {
          DEFAULT: '#34d399',
          dim: '#059669',
        },
        warning: {
          DEFAULT: '#fbbf24',
          dim: '#d97706',
        },
        danger: {
          DEFAULT: '#f87171',
          dim: '#dc2626',
        },
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.12)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
    },
  },
  plugins: [],
};
