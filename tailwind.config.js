/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arwin: {
          red: '#7A1522',           // Rich dark luxury crimson
          redLight: '#8B0000',      // Hover dark crimson
          redDark: '#6B0F1A',       // Deepest dark wine
          crimson: '#7A1522',       // Deep ruby crimson
          burgundy: '#580B17',      // Base dark wine
          coral: '#FF6B6B',         // Upper fan coral petal
          blush: '#FCE7F3',         // Subtle blush tint
          gold: '#C5A880',          // Refined champagne accent
          goldLight: '#DFC9AA',     // Highlight gold
          goldDark: '#9E7E55',      // Bronze accent
          cream: '#FAF8F5',         // Luxury warm ivory background
          creamDark: '#F3EDE4',     // Muted card linen
          charcoal: '#222222',      // Headings & logo typography
          muted: '#555555',         // Subtext
          border: '#E8E1D7',        // Subtle luxury divider
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        signature: ['"Alex Brush"', '"Great Vibes"', 'cursive']
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(230, 28, 36, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(230, 28, 36, 0.15)',
        'red-glow': '0 0 25px rgba(230, 28, 36, 0.35)',
      }
    },
  },
  plugins: [],
}
