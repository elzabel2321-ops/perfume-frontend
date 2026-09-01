/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './component/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#C9A038',
        'brand-gold-hover': '#B38C2B',
        'background-cream': '#FAF7F2',
        'card-canvas': '#FFFFFF',
        'text-dark': '#2A2421',
        'text-muted': '#7A7267',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
