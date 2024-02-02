import React from 'react';
import finnishTranslations from '../../../../i18n/fi.json';
import { renderWithProviders } from '../../../../testUtils/testUtils';
import EmailForm from '../EmailForm';

describe('<EmailForm />', () => {
  test('renders the EmailForm component', () => {
    const { container } = renderWithProviders(<EmailForm />);
    expect(container).toBeTruthy();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(<EmailForm />);

    const label = container.querySelectorAll('label');
    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(finnishTranslations['app.text.newsletter']);
    expect(label[0].textContent).toContain(finnishTranslations['app.form.email.label']);
    expect(label).toHaveLength(1);
    expect(p).toHaveLength(1);
  });

  it('does contain inputs', () => {
    const { container } = renderWithProviders(<EmailForm />);

    const inputs = container.querySelectorAll('input');
    expect(inputs[0]).toBeInTheDocument();
    expect(inputs).toHaveLength(1);
  });

  it('does contain button', () => {
    const { container } = renderWithProviders(<EmailForm />);

    const buttons = container.querySelectorAll('button');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons).toHaveLength(1);
  });
});
