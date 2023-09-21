import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import { mainTheme } from '../themes/theme';
import LocaleUtility from '../utils/locale';
import Content from './Content/Content';
import HomePage from './Pages/HomePage/HomePage';
import Layout from './Pages/Layout/Layout';

const App = () => {
  const { settings } = useAppSelector((state) => state);
  const locale = settings.localeSelection;
  const intlData = LocaleUtility.intlData(locale);
  return (
    <IntlProvider {...intlData}>
      <ThemeProvider theme={mainTheme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/questions" element={<Content />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
