import React from 'react';
import { useIntl } from 'react-intl';
import { ErrorComponentProps } from '../../../types';

const ErrorComponent = ({ translationId, children }: ErrorComponentProps) => {
  const intl = useIntl();

  return (
    <div className="container">
      <p className="text-error">{intl.formatMessage({ id: translationId })}</p>
      <div className="mt-3 center-text">{children}</div>
    </div>
  );
};

export default ErrorComponent;
