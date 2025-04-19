/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          dark: '#FF5252',
          light: '#FF8585',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          dark: '#45B7AE',
          light: '#65D8D0',
        },
        accent: {
          DEFAULT: '#FFE66D',
          dark: '#FFE147',
          light: '#FFEB94',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      transitionDuration: {
        'slow': '300ms',
        'medium': '200ms',
        'fast': '100ms',
      },
      spacing: {
        'section': 'var(--section-padding)',
        'container': 'var(--container-padding)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'full': 'var(--radius-full)',
      },
      zIndex: {
        'modal': 'var(--z-modal)',
        'navbar': 'var(--z-navbar)',
        'dropdown': 'var(--z-dropdown)',
        'default': 'var(--z-default)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

