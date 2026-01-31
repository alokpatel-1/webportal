/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          'primary-active': 'var(--color-primary-active)',
          secondary: 'var(--color-secondary)',
          'secondary-light': 'var(--color-secondary-light)',
          accent: 'var(--color-accent)',
          'accent-soft': 'var(--color-accent-soft)',
        },
        bg: {
          app: 'var(--color-bg-app)',
          card: 'var(--color-bg-card)',
          muted: 'var(--color-bg-muted)',
        },
        text: {
          brand: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        }
      },
      borderRadius: {
        'brand-sm': 'var(--radius-sm)',
        'brand-md': 'var(--radius-md)',
        'brand-lg': 'var(--radius-lg)',
      },
      boxShadow: {
        'brand-sm': 'var(--shadow-sm)',
        'brand-md': 'var(--shadow-md)',
        'brand-lg': 'var(--shadow-lg)',
      }
    },
  },
  plugins: [],
}

