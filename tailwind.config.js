const {nextui} = require("@nextui-org/react");


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'montserrat': ['montserrat']
    },
    colors: {
      'fondo': '#EAEBED',
      'botonPositivo': '#01A7C2',
      'botonNegativo': '#A3BAC3',
      'azulTexto': '#006989'
     },
  
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}
