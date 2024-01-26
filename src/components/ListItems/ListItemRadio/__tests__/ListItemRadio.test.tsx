import React from 'react';
import { renderWithProviders } from '../../../../testUtils/testUtils';
import ListItemRadio from '../ListItemRadio';

const mockData = {
  id: 5,
  number: '1',
  question: 'Test question',
  question_fi: 'Test question',
  question_en: 'Test question',
  question_sv: 'Test question',
  description_fi: 'Test description',
  description_en: 'Testi description',
  description_sv: 'Testi description',
  options: [
    {
      id: 4,
      value: 'testi 1',
      value_fi: 'testi 1',
      value_en: 'test 1',
      value_sv: 'test 1',
      sub_question: '3',
    },
  ],
  sub_questions: [
    {
      id: 10,
      description_fi: 'Testi description',
      description_en: 'Testi description',
      description_sv: 'Testi description',
      options: [
        {
          id: 4,
          value: 'testi 1',
          value_fi: 'testi 1',
          value_en: 'test 1',
          value_sv: 'test 1',
          sub_question: '4',
        },
      ],
    },
  ],
  sub_question: 3,
};
const mockProps = {
  question: mockData,
};

describe('<ListItemRadio />', () => {
  test('renders the ListItemRadio component', () => {
    const { container } = renderWithProviders(<ListItemRadio question={mockProps.question} />);
    expect(container).toBeTruthy();
  });
});
