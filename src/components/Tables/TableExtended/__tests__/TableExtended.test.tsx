import React from 'react';
import finnishTranslations from '../../../../i18n/fi.json';
import { renderWithProviders } from '../../../../testUtils/testUtils';
import TableExtended from '../TableExtended';

const mockData = {
  id: 5,
  number: '1',
  question: 'Test question',
  question_fi: 'Test question',
  question_en: 'Test question',
  question_sv: 'Test question',
  description_fi: 'Testi description',
  description_en: 'Test description',
  description_sv: 'Test description',
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
      description_fi: 'Testi sub description',
      description_en: 'Test sub description',
      description_sv: 'Test sub description',
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
  questionData: mockData,
};

describe('<TableExtended />', () => {
  test('renders the TableExtended component', () => {
    const { container } = renderWithProviders(
      <TableExtended questionData={mockProps.questionData} />,
    );
    expect(container).toBeTruthy();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(
      <TableExtended questionData={mockProps.questionData} />,
    );

    const p = container.querySelectorAll('p');
    const label = container.querySelectorAll('label');
    expect(p[0].textContent).toContain(finnishTranslations['app.text.options']);
    expect(p[1].textContent).toContain(mockProps.questionData.options[0].value_fi);
    expect(label[0].textContent).toContain(mockProps.questionData.sub_questions[0].description_fi);
  });

  it('does contain input', () => {
    const { container } = renderWithProviders(
      <TableExtended questionData={mockProps.questionData} />,
    );

    const input = container.querySelectorAll('input');
    expect(input[0]).toBeInTheDocument();
  });
});
