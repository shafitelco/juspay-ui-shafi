/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif']
      },
      boxShadow: {
        custom: '0px 0px 18.3px 0px rgba(0, 0, 0, 0.1)'
      },

      colors: {
        magnaOrange: '#CC8410',
        magnaDark: '#101214'
      }
    },
    screens: {
      xs: '350px',
      CustomXs: '380px',
      sm: '500px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      bigXl: '1400px',
      monitorXl: '1920px'
    }
  }
}
