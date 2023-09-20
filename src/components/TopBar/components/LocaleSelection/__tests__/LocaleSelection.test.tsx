import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
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
  test('Renders component', () => {
    const { container } = render(
      <Provider store={store()}>
        <IntlProvider {...intlMock}>
          <ThemeProvider theme={mainTheme}>
            <LocaleSelection />
          </ThemeProvider>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toBeTruthy();
  });
});
