import React from 'react';
import { renderWithProviders } from '../../../../testUtils/testUtils';
import TableCommon from '../TableCommon';

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
      sub_question: '1',
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
          sub_question: '2',
        },
      ],
    },
  ],
  sub_question: 5,
};
const mockProps = {
  question: mockData,
};

describe('<TableCommon />', () => {
  test('renders the TableCommon component', () => {
    const { container } = renderWithProviders(<TableCommon question={mockProps.question} />);
    expect(container).toBeTruthy();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<TableCommon question={mockProps.question} />);

    const label = container.querySelectorAll('label');
    expect(label[0].textContent).toContain(mockProps.question.options[0].value_fi);
  });

  it('does contain input', () => {
    const { container } = renderWithProviders(<TableCommon question={mockProps.question} />);

    const input = container.querySelectorAll('input');
    expect(input[0]).toBeInTheDocument();
  });
});
