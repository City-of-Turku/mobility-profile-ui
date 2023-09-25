import React from 'react';
import { renderWithProviders } from '../../../testUtils/testUtils';
import QuestionForm from '../QuestionForm';

describe('<QuestionForm />', () => {
  test('renders the QuestionForm component', () => {
    const { container } = renderWithProviders(<QuestionForm />);
    expect(container).toBeTruthy();
  });
});
