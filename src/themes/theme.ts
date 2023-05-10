import { createTheme } from '@mui/material/styles';

const baseTypography = {
  root: {
    fontSize: 16,
    fontFamily: 'Arial',
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
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  h4: {
    fontSize: 16,
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
    lineHeight: 1.5,
    fontSize: 16,
  },
  body2: {
    lineHeight: 1.5,
    fontSize: 18,
  },
};

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#006BB6',
    },
    text: {
        primary: '#0000',
    },
  },
  typography: {
    ...baseTypography.root,
    h1: {
      ...baseTypography.h1,
      fontWeight: 900,
      letterSpacing: 1,
    },
    h2: {
      ...baseTypography.h2,
      fontWeight: 900,
      letterSpacing: 1,
    },
    h3: {
      ...baseTypography.h3,
    },
    h4: {
      ...baseTypography.h4,
    },
    h5: {
      ...baseTypography.h5,
    },
    h6: {
      ...baseTypography.h6,
    },
    body1: {
      ...baseTypography.body1,
      color: '#2B2B2B',
    },
    body2: {
      ...baseTypography.body2,
      color: '#2B2B2B',
    },
  },
});
