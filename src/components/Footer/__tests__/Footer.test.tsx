import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import finnish from '../../../i18n/fi.json';
import { mainTheme } from '../../../themes/theme';
import Footer from '../Footer';

const intlMock = {
  locale: 'fi',
  messages: finnish,
  wrapRichTextChunksInFragment: false,
};

describe('<Footer />', () => {
  it('should render text', () => {
    render(
      <IntlProvider {...intlMock}>
        <ThemeProvider theme={mainTheme}>
          <Footer />
        </ThemeProvider>
      </IntlProvider>,
    );
    expect(screen.getByText(/Turun kaupunki/)).toBeInTheDocument();
  });
});
