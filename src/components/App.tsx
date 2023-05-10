import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { mainTheme } from '../themes/theme';
import Content from './Content/Content';

const App: React.FC = () => {
  return (
      <ThemeProvider theme={mainTheme}>
        <div>
          <Content />
        </div>
      </ThemeProvider>
  );
};

export default App;
