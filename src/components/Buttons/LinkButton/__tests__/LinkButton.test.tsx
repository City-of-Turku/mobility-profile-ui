import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import finnishTranslations from '../../../../i18n/fi.json';
import { renderWithProviders } from '../../../../testUtils/testUtils';
import LinkButton from '../LinkButton';

const mockProps = {
  urlValue: 'summary',
  translationId: 'app.buttons.link.summary',
  isActive: true,
};

describe('<LinkButton />', () => {
  test('renders the LinkButton component', () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <LinkButton {...mockProps} />
      </MemoryRouter>,
    );
    expect(container).toBeTruthy();
  });

  it('does show text correctly', () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <LinkButton {...mockProps} />
      </MemoryRouter>,
    );

    const p = container.querySelectorAll('p');
    expect(p[0].textContent).toContain(finnishTranslations['app.buttons.link.summary']);
    expect(p).toHaveLength(1);
  });

  it('does contain button', () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <LinkButton {...mockProps} />
      </MemoryRouter>,
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons).toHaveLength(1);
  });

  it('does contain aria attributes', () => {
    const { container } = renderWithProviders(
      <MemoryRouter>
        <LinkButton {...mockProps} />
      </MemoryRouter>,
    );

    const button = container.querySelectorAll('button');
    expect(button[0].getAttribute('aria-label')).toContain(
      finnishTranslations['app.buttons.link.summary'],
    );
    expect(button[0].getAttribute('aria-disabled')).toEqual('false');
  });
});
