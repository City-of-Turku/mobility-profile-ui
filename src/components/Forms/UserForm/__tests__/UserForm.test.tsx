import React from 'react';
import finnishTranslations from '../../../../i18n/fi.json';
import { renderWithProviders } from '../../../../testUtils/testUtils';
import UserForm from '../UserForm';

const mockProps = {
  answerStatus: false,
  setAnswerStatus: jest.fn(),
};

describe('<UserForm />', () => {
  test('renders the UserForm component', () => {
    const { container } = renderWithProviders(<UserForm {...mockProps} />);
    expect(container).toBeTruthy();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<UserForm {...mockProps} />);

    const label = container.querySelectorAll('label');
    const p = container.querySelectorAll('p');
    expect(p[1].textContent).toContain(finnishTranslations['app.form.info.question']);
    expect(p[2].textContent).toContain(finnishTranslations['app.form.user.confirmation']);
    expect(label[0].textContent).toContain(finnishTranslations['app.form.yearOfBirth.label']);
    expect(label[1].textContent).toContain(finnishTranslations['app.form.postalCode.label']);
    expect(label[2].textContent).toContain(
      finnishTranslations['app.form.optionalPostalCode.label'],
    );
    expect(label[3].textContent).toContain(finnishTranslations['app.form.filledForFun.label']);
    expect(label[4].textContent).toContain(finnishTranslations['app.form.useResult.label']);
    expect(label).toHaveLength(5);
  });

  it('does contain inputs', () => {
    const { container } = renderWithProviders(<UserForm {...mockProps} />);

    const inputs = container.querySelectorAll('input');
    const select = container.querySelectorAll('select');
    expect(inputs[0]).toBeInTheDocument();
    expect(inputs).toHaveLength(2);
    expect(select[0]).toBeInTheDocument();
    expect(select).toHaveLength(3);
  });

  it('does contain button', () => {
    const { container } = renderWithProviders(<UserForm {...mockProps} />);

    const buttons = container.querySelectorAll('button');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons).toHaveLength(1);
  });
});
