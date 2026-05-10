/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Hata buradaydı, başına @ ve sonuna /postcss ekledik
  },
};

export default config;