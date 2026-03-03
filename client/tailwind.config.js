/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory:      '#faf7f2',
        champagne:  '#f5ede2',
        blush:      '#f2d8d5',
        gold:       '#c9a966',
        'gold-light': '#e0c98a',
        'gold-dim': '#9a7a40',
        rose:       '#c4878a',
        'rose-light': '#e8b4b8',
        warmblack:  '#16100d',
        'warm-900': '#2a1a10',
        'warm-800': '#3d2820',
        taupe:      '#8a7060',
        'taupe-light': '#c0aa98',
        parchment:  '#f0e4d0',
      },
      fontFamily: {
        display:   ['"Playfair Display"', 'Georgia', 'serif'],
        italic:    ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:      ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        float:      'float 8s ease-in-out infinite',
        shimmer:    'shimmer 4s ease-in-out infinite',
        'fade-up':  'fadeUp 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':  'fadeIn 0.4s ease-out forwards',
        sparkle:    'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%,100%': { opacity: '0.5' },
          '50%':     { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(100%)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        sparkle: {
          '0%,100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%':     { transform: 'scale(1.3)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
