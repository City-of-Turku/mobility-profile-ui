import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import LocaleUtility from '../utils/locale';
import Content from './Content/Content';
import HomePage from './Pages/HomePage/HomePage';
import InfoPage from './Pages/InfoPage/InfoPage';
import Layout from './Pages/Layout/Layout';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import ResultPage from './Pages/ResultPage/ResultPage';
import ProtectedRoute from './Routes/ProtectedRoute/ProtectedRoute';

const App = () => {
  const { localeSelection } = useAppSelector((state) => state.settings);
  const intlData = LocaleUtility.intlData(localeSelection);

  return (
    <IntlProvider {...intlData}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/questions" element={<Content />} />
            <Route
              path="/info"
              element={
                <ProtectedRoute>
                  <InfoPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/summary"
              element={
                <ProtectedRoute>
                  <ResultPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
