import React from 'react';
import { renderWithProviders } from '../../../../testUtils/testUtils';
import TextBasic from '../TextBasic';

describe('<TextBasic />', () => {
  it('Renders the TextBasic component', () => {
    const { container } = renderWithProviders(<TextBasic text="app.title" isTitle />);
    expect(container).toBeTruthy();
  });

  it('should render title text', () => {
    const { container } = renderWithProviders(<TextBasic text="app.title" isTitle />);
    const h3 = container.querySelectorAll('h3');
    expect(h3[0].textContent).toContain('Liikkumisprofiili');
  });

  it('should render basic text', () => {
    const { container } = renderWithProviders(<TextBasic text="Test text" />);
    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain('Test text');
  });
});
