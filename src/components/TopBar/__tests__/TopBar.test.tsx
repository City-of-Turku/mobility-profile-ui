import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import finnish from '../../../i18n/fi.json';
import { store } from '../../../redux/store';
import { mainTheme } from '../../../themes/theme';
import TopBar from '../TopBar';

const intlMock = {
  locale: 'fi',
  messages: finnish,
  wrapRichTextChunksInFragment: false,
};

describe('<TopBar />', () => {
  test('renders the TopBar component', () => {
    const { container } = render(
      <Provider store={store()}>
        <IntlProvider {...intlMock}>
          <ThemeProvider theme={mainTheme}>
            <TopBar />
          </ThemeProvider>
        </IntlProvider>
      </Provider>,
    );
    expect(container).toBeTruthy();
  });
});
