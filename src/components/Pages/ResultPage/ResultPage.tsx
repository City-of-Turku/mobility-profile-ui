import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import capercaillieImg from '../../../assets/images/capercaillie.webp';
import deerImg from '../../../assets/images/deer.webp';
import foxImg from '../../../assets/images/fox.webp';
import martenImg from '../../../assets/images/marten.webp';
import mooseImg from '../../../assets/images/moose.webp';
import rabbitImg from '../../../assets/images/rabbit.webp';
import { useAppSelector } from '../../../hooks/reduxHooks';
import useLocaleText from '../../../utils/useLocaleText';
import { renderLocaleValue } from '../../../utils/utils';
import HomeButton from '../../Buttons/HomeButton/HomeButton';
import EmailForm from '../../Forms/EmailForm/EmailForm';

//TODO finalize logout functionality
const ResultPage = () => {
  const [resultError, setResultError] = useState(false);

  const intl = useIntl();

  const getLocaleText = useLocaleText();

  const { user } = useAppSelector((state) => state);

  const userResult = user.profileResult;

  const mobilityProfiles = {
    moose: mooseImg,
    deer: deerImg,
    fox: foxImg,
    rabbit: rabbitImg,
    capercaillie: capercaillieImg,
    marten: martenImg,
  };

  const getProfile = (type: string) => {
    const typeLower = type.toLowerCase();
    switch (typeLower) {
      case 'autoilija':
        return mobilityProfiles.moose;
      case 'maas-matkustaja':
        return mobilityProfiles.deer;
      case 'tavan mukaan kulkeva':
        return mobilityProfiles.fox;
      case 'kävelijä-pyöräilijä':
        return mobilityProfiles.rabbit;
      case 'valveutunut matkustaja':
        return mobilityProfiles.capercaillie;
      case 'joukkoliikenteen käyttäjä':
        return mobilityProfiles.marten;
      default:
        return 'autoilija';
    }
  };

  useEffect(() => {
    if (!userResult || !userResult?.topic.length) {
      setResultError(true);
    }
  }, [userResult]);

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
        {userResult?.topic?.length ? (
          <div className="image-container-md">
            <img src={getProfile(userResult.topic)} className="img-fluid" alt="illustration" />
          </div>
        ) : null}
      </React.Fragment>
      <EmailForm />
      <HomeButton />
    </section>
  );
};

export default ResultPage;
