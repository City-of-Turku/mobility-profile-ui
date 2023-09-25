import React from 'react';
import { renderWithProviders } from '../../../../../testUtils/testUtils';
import LocaleSelection from '../LocaleSelection';

describe('<LocaleSelection />', () => {
  test('Renders the LocaleSelection component', () => {
    const { container } = renderWithProviders(<LocaleSelection />);
    expect(container).toBeTruthy();
  });

  test('Renders 3 buttons', () => {
    const { getAllByRole } = renderWithProviders(<LocaleSelection />);
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('Should render texts', () => {
    const { container } = renderWithProviders(<LocaleSelection />);
    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toEqual('Suomeksi');
    expect(p[1].textContent).toEqual('In English');
    expect(p[2].textContent).toEqual('På svenska');
  });
});
