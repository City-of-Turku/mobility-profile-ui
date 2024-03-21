import { render } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import finnish from '../i18n/fi.json';
import { store } from '../redux/store';

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
    <IntlProvider {...intlMock}>{children}</IntlProvider>
  </Provider>
);

export const renderWithProviders = (component: ReactElement<string>) =>
  render(component, { wrapper: Providers });
