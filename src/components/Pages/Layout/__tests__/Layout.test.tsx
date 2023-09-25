import React from 'react';
import { renderWithProviders } from '../../../../testUtils/testUtils';
import Layout from '../Layout';

const mockChildren = () => (
  <div>
    <p>Testi</p>
  </div>
);

describe('<TopBar />', () => {
  test('renders the Layout component', () => {
    const { container } = renderWithProviders(<Layout>{mockChildren()}</Layout>);
    expect(container).toBeTruthy();
  });
});
