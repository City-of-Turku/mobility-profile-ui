import React from 'react';
import finnishTranslations from '../../../i18n/fi.json';
import { renderWithProviders } from '../../../testUtils/testUtils';
import Loading from '../Loading';

describe('<Loading />', () => {
  test('renders the Loading component', () => {
    const { container } = renderWithProviders(<Loading />);
    expect(container).toBeTruthy();
  });

  test('It renders text correctly', () => {
    const { container } = renderWithProviders(<Loading />);
    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(finnishTranslations['app.text.loading']);
  });
});
