import { ThemeProvider } from '@mui/material/styles';
import React, { ReactNode } from 'react';
import { mainTheme } from './theme';

interface ThemeProps {
  children: ReactNode;
}

const ThemeWrapper = ({ children }: ThemeProps) => {
  return <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
