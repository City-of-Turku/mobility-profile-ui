import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import finnish from '../../../../../i18n/fi.json';
import { store } from '../../../../../redux/store';
import { mainTheme } from '../../../../../themes/theme';
import LocaleSelection from '../LocaleSelection';

const intlMock = {
  locale: 'fi',
  messages: finnish,
  wrapRichTextChunksInFragment: false,
};

describe('<LocaleSelection />', () => {
  test('renders buttons', () => {
    render(
      <Provider store={store()}>
        <IntlProvider {...intlMock}>
          <ThemeProvider theme={mainTheme}>
            <LocaleSelection />
          </ThemeProvider>
        </IntlProvider>
      </Provider>,
    );
    expect(screen.getByRole('button', { name: 'Suomeksi' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'In English' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'På svenska' })).toBeInTheDocument();
  });
});
