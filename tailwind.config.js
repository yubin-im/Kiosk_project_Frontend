/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        mcred: '#DA291C',
        mcyellow: '#FFC72C',
        mcblack: '#27251F',
      },
    },
  },
  plugins: [],
};
