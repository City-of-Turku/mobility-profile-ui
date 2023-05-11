import { ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from '../hooks/reduxHooks';
import React from 'react';
import { IntlProvider } from 'react-intl';
import LocaleUtility from '../utils/locale';
import { mainTheme } from '../themes/theme';
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
