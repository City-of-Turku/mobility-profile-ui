import React from 'react';
import finnishTranslations from '../../../../i18n/fi.json';
import { renderWithProviders } from '../../../../testUtils/testUtils';
import TextBasic from '../TextBasic';

const mockProps = {
  translationId: 'app.result.newsletter.success',
};

describe('<TextBasic />', () => {
  test('renders the TextBasic component', () => {
    const { container } = renderWithProviders(<TextBasic {...mockProps} />);
    expect(container).toBeTruthy();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<TextBasic {...mockProps} />);

    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(finnishTranslations['app.result.newsletter.success']);
    expect(p).toHaveLength(1);
  });
});
