import React from 'react';
import { renderWithProviders } from '../../../testUtils/testUtils';
import TopBar from '../TopBar';

describe('<TopBar />', () => {
  test('renders the TopBar component', () => {
    const { container } = renderWithProviders(<TopBar />);
    expect(container).toBeTruthy();
  });
});
