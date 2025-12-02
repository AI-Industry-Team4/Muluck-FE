export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      borderRadius: {
        '3xl': '1.75rem',
      },
      boxShadow: {
        'app-frame': '0 20px 40px rgba(15, 23, 42, 0.15)',
      },
    },
  },
  plugins: [],
}
