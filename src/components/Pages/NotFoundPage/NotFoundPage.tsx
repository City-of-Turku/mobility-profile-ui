import React from 'react';
import { useIntl } from 'react-intl';
import HomeButton from '../../Buttons/HomeButton/HomeButton';

const NotFoundPage = () => {
  const intl = useIntl();

  return (
    <div className="container flex-center">
      <div className="mb-2">
        <h1 className="header-h1">404</h1>
      </div>
      <div className="mb-2">
        <h2 className="header-h2">{intl.formatMessage({ id: 'app.general.not.found' })}</h2>
      </div>
      <HomeButton />
    </div>
  );
};

export default NotFoundPage;
