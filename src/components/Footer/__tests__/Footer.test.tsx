import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import finnish from '../../../i18n/fi.json';
import { store } from '../../../redux/store';
import { mainTheme } from '../../../themes/theme';
import Footer from '../Footer';

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

const renderWithProviders = (component: ReactElement<string>) =>
  render(component, { wrapper: Providers });

describe('<Footer />', () => {
  it('Should render <Footer /> component', () => {
    const { container } = renderWithProviders(<Footer />);
    expect(container).toBeTruthy();
  });
  it('should render text', () => {
    const { container } = renderWithProviders(<Footer />);
    const h6 = container.querySelectorAll('h6');
    expect(h6[0].textContent).toContain('Turun kaupunki');
  });
});
