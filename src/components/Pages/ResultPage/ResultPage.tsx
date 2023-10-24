import React from 'react';
import { useIntl } from 'react-intl';
import HomeButton from '../../Buttons/HomeButton/HomeButton';

//TODO update to show survey results to user, finalize texts & styles

const ResultPage = () => {
  const intl = useIntl();

  return (
    <div className="container flex-center">
      <div className="text-container">
        <h5 className="header-h5 mb-2">{intl.formatMessage({ id: 'app.general.summary' })}</h5>
      </div>
      <div className="text-container mb-2">
        <p className="text-normal">Kyselyn tulokset näkyvät täällä.</p>
      </div>
      <HomeButton />
    </div>
  );
};

export default ResultPage;
