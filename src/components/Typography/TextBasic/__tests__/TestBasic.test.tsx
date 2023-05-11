import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { mainTheme } from '../../../../themes/theme';
import finnish from '../../../../i18n/fi.json';
import TextBasic from '../TextBasic';

const intlMock = {
  locale: 'fi',
  messages: finnish,
  wrapRichTextChunksInFragment: false,
};

describe('<TextBasic />', () => {
  it('should render text', () => {
    render(
      <IntlProvider {...intlMock}>
        <ThemeProvider theme={mainTheme}>
          <TextBasic text="Test text" />
        </ThemeProvider>
      </IntlProvider>,
    );
    expect(screen.getByText(/Test text/)).toBeInTheDocument();
  });
});
