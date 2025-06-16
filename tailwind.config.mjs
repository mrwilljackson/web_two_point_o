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
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
})
