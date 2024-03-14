import React from 'react';
import { useIntl } from 'react-intl';

const Loading = () => {
  const intl = useIntl();

  return (
    <div className="flex-row">
      <div className="spinner-border" role="status" />
      <div className="ml-2">
        <p className="text-normal">{intl.formatMessage({ id: 'app.text.loading' })}</p>
      </div>
    </div>
  );
};

export default Loading;
