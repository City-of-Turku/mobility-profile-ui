import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import ThemeWrapper from '../themes/ThemeWrapper';
import LocaleUtility from '../utils/locale';
import Content from './Content/Content';
import HomePage from './Pages/HomePage/HomePage';
import Layout from './Pages/Layout/Layout';

const App = () => {
  const { settings } = useAppSelector((state) => state);
  const locale = settings.localeSelection;
  const intlData = LocaleUtility.intlData(locale);
  return (
    <ThemeWrapper>
      <IntlProvider {...intlData}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/questions" element={<Content />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </IntlProvider>
    </ThemeWrapper>
  );
};

export default App;
