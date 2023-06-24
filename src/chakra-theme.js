import { extendTheme } from "@chakra-ui/react";


const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const colors = {
  primary: '#333333',
  secondary: '#FFFFFF',
  accent: '#FDB813',
  font: '#FFFFFF',
};

const sizes = {
  max: 'max-content',
  min: 'min-content',
  full: '100%',
  '3xs': '14rem',
  '2xs': '16rem',
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
  '8xl': '90rem',
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};
// to change later
const fonts = {
  body: "Roboto, sans-serif",
  heading: "Tahoma, sans-serif",
};

const theme = extendTheme({ breakpoints, colors, sizes, fonts});

export default theme;
