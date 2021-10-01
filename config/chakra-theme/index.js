import { extendTheme } from '@chakra-ui/react';

// use this to generate tones https://smart-swatch.netlify.app

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e2fbed',
      100: '#c2ebd4',
      200: '#9fddb9',
      300: '#7ccf9e',
      400: '#58c184',
      500: '#3ea76a',
      600: '#2e8251',
      700: '#1f5d3a',
      800: '#0f3921',
      900: '#001506',
    },
    secondary: {
      50: '#efeffc',
      100: '#d3d2e1',
      200: '#b6b4ca',
      300: '#9997b4',
      400: '#7c799e',
      500: '#625f84',
      600: '#4d4a67',
      700: '#37354b',
      800: '#21202f',
      900: '#0a0a16',
    },
  },
});

export default theme;
