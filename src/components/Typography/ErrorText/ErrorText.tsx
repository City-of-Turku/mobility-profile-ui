import React from 'react';
import { useIntl } from 'react-intl';

const ErrorText = () => {
  const intl = useIntl();

  return (
    <div className="mt-2">
      <p className="text-error">{intl.formatMessage({ id: 'app.result.error' })}</p>
    </div>
  );
};

export default ErrorText;
