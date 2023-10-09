import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import finnish from '../i18n/fi.json';
import { store } from '../redux/store';
import { mainTheme } from '../themes/theme';

interface ProviderProps {
  children: ReactNode;
}

const intlMock = {
  locale: 'fi',
  messages: finnish,
  wrapRichTextChunksInFragment: false,
};

const Providers = ({ children }: ProviderProps) => (
  <Provider store={store()}>
    <IntlProvider {...intlMock}>
      <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>
    </IntlProvider>
  </Provider>
);

export const renderWithProviders = (component: ReactElement<string>) =>
  render(component, { wrapper: Providers });