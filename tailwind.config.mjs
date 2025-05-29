import { defineConfig } from '@tailwindcss/vite'

export default defineConfig({
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'playphysio-blue': '#4DBBFA',
        'playphysio-green': '#58D68D',
        'playphysio-yellow': '#F4D03F',
        'playphysio-pink': '#FF6B81',
        'playphysio-purple': '#9B59B6',
        'playphysio-orange': '#F39C12',
        'playphysio-cyan': '#22D3EE',
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.8s ease-out forwards',
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
})
