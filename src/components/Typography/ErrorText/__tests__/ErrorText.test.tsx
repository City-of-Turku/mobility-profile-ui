import React from 'react';
import finnishTranslations from '../../../../i18n/fi.json';
import { renderWithProviders } from '../../../../testUtils/testUtils';
import ErrorText from '../ErrorText';

describe('<ErrorText />', () => {
  test('renders the ErrorText component', () => {
    const { container } = renderWithProviders(<ErrorText />);
    expect(container).toBeTruthy();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<ErrorText />);

    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(finnishTranslations['app.result.error']);
    expect(p).toHaveLength(1);
  });
});
