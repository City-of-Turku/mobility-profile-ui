import React from 'react';
import { renderWithProviders } from '../../../testUtils/testUtils';
import Footer from '../Footer';

describe('<Footer />', () => {
  it('Renders the Footer component', () => {
    const { container } = renderWithProviders(<Footer />);
    expect(container).toBeTruthy();
  });
  it('Should render text', () => {
    const { container } = renderWithProviders(<Footer />);
    const h6 = container.querySelectorAll('h6');
    expect(h6[0].textContent).toContain('Turun kaupunki');
  });
});
