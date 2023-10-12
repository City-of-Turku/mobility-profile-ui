import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import LocaleUtility from '../utils/locale';
import Content from './Content/Content';
import HomePage from './Pages/HomePage/HomePage';
import Layout from './Pages/Layout/Layout';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import ResultPage from './Pages/ResultPage/ResultPage';

const App = () => {
  const { settings } = useAppSelector((state) => state);
  const locale = settings.localeSelection;
  const intlData = LocaleUtility.intlData(locale);
  return (
    <IntlProvider {...intlData}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/questions" element={<Content />} />
            <Route path="/summary" element={<ResultPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
