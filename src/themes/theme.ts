import { createTheme } from '@mui/material/styles';

const breakpoints = {
  values: {
    xs: 0,
    sm: 700,
    md: 900,
    lg: 1280,
    xl: 1920,
  },
};

const spacing = 8;

const typography = {
  root: {
    fontSize: 16,
    fontFamily: 'Arial, sans-serif',
    fontWeightReqular: 400,
    fontWeightBold: 700,
  },
  h1: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  h5: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  h6: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  body1: {
    fontSize: 16,
    lineHeight: 1.4,
  },
  body2: {
    fontSize: 18,
    lineHeight: 1.5,
  },
};

const palette = {
  primary: {
    main: 'rgb(0, 98, 174)',
  },
  secondary: {
    main: 'rgb(0, 155, 260)',
  },
  yellow: {
    main: 'rgb(255, 210, 57)',
  },
  white: {
    light: '#f2f2f2',
    main: '#fff',
    dark: '#949494',
    contrastText: '#000',
  },
  text: {
    primary: '#000',
    secondary: '#fff',
  },
};

export const mainTheme = createTheme({
  breakpoints,
  typography,
  spacing,
  palette,
});
