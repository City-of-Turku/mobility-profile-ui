import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../testUtils/testUtils';
import HomeButton from '../HomeButton';

describe('<HomeButton />', () => {
  test('Renders the HomeButton component', () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <HomeButton />
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
  });

  test('Renders button', () => {
    const { getAllByRole } = renderWithProviders(
      <MemoryRouter>
        <HomeButton />
      </MemoryRouter>,
    );
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(1);
  });

  test('Should render text', () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <HomeButton />
      </MemoryRouter>,
    );
    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toEqual('Palaa etusivulle');
  });
});
