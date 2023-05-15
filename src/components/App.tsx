import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { useAppSelector } from '../hooks/reduxHooks';
import { mainTheme } from '../themes/theme';
import LocaleUtility from '../utils/locale';
import Content from './Content/Content';

const App = () => {
  const { settings } = useAppSelector((state) => state);
  const locale = settings.localeSelection;
  const intlData = LocaleUtility.intlData(locale);
  return (
    <IntlProvider {...intlData}>
      <ThemeProvider theme={mainTheme}>
        <Content />
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
