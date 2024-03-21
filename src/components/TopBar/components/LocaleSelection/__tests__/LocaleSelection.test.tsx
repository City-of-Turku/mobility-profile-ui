import React from 'react';
import finnishTranslations from '../../../../../i18n/fi.json';
import { renderWithProviders } from '../../../../../testUtils/testUtils';
import LocaleSelection from '../LocaleSelection';

describe('<LocaleSelection />', () => {
  test('Renders the LocaleSelection component', () => {
    const { container } = renderWithProviders(<LocaleSelection />);
    expect(container).toBeTruthy();
  });

  test('Renders 3 buttons', () => {
    const { getAllByRole } = renderWithProviders(<LocaleSelection />);
    const buttons = getAllByRole('link');
    expect(buttons).toHaveLength(3);
  });

  it('Should render texts', () => {
    const { container } = renderWithProviders(<LocaleSelection />);
    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(finnishTranslations['app.general.language.fi']);
    expect(p[1].textContent).toContain(finnishTranslations['app.general.language.sv']);
    expect(p[2].textContent).toContain(finnishTranslations['app.general.language.en']);
  });
});
