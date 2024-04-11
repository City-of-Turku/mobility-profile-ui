import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { logoutUser } from '../../../utils/mobilityProfileAPI';
import useLocaleText from '../../../utils/useLocaleText';
import { renderLocaleValue } from '../../../utils/utils';
import HomeButton from '../../Buttons/HomeButton/HomeButton';
import EmailForm from '../../Forms/EmailForm/EmailForm';
import ResultImage from './components/ResultImage/ResultImage';

const ResultPage = () => {
  const [resultError, setResultError] = useState(false);

  const intl = useIntl();

  const getLocaleText = useLocaleText();

  const { user } = useAppSelector((state) => state);

  const userResult = user.profileResult;
  const token = user.csrfToken;

  useEffect(() => {
    if (!userResult || !userResult?.topic.length) {
      setResultError(true);
    }
  }, [userResult]);

  useEffect(() => {
    if (token?.length) {
      logoutUser(token);
    }
  }, [token]);

  return (
    <section className="container flex-center">
      <div className="text-container">
        <h3 className="header-h3 mb-2">{intl.formatMessage({ id: 'app.general.summary' })}</h3>
      </div>
      {resultError ? (
        <div className="mb-3">
          <p className="text-error">{intl.formatMessage({ id: 'app.result.error' })}</p>
        </div>
      ) : null}
      <React.Fragment>
        {userResult?.value_fi?.length ? (
          <div className="text-container mb-2">
            <p className="header-h4">
              {renderLocaleValue(
                getLocaleText,
                userResult.value_fi,
                userResult.value_en,
                userResult.value_sv,
              )}
            </p>
          </div>
        ) : null}
        {userResult?.description_fi?.length ? (
          <div className="text-container mb-2">
            <p className="text-normal">
              {renderLocaleValue(
                getLocaleText,
                userResult.description_fi,
                userResult.description_en,
                userResult.description_sv,
              )}
            </p>
          </div>
        ) : null}
        {userResult?.topic?.length ? <ResultImage topic={userResult.topic} /> : null}
      </React.Fragment>
      {!resultError ? <EmailForm /> : null}
      <HomeButton />
    </section>
  );
};

export default ResultPage;
