import React from 'react';
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
import EmailField from '../../EmailField/EmailField';

//TODO finalize logout functionality, texts & styles

const ResultPage = () => {
  const intl = useIntl();

  const getLocaleText = useLocaleText();

  const { user } = useAppSelector((state) => state);

  const userResult = user.profileResult;
  // const token = user.csrfToken;

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
      case 'helppo hirvi':
        return mobilityProfiles.moose;
      case 'kokeileva kauris':
        return mobilityProfiles.deer;
      case 'käytännöllinen kettu':
        return mobilityProfiles.fox;
      case 'joustava jänis':
        return mobilityProfiles.rabbit;
      case 'määrätietoinen metso':
        return mobilityProfiles.capercaillie;
      case 'nokkela näätä':
        return mobilityProfiles.marten;
      default:
        return 'helppo hirvi';
    }
  };

  return (
    <section className="container flex-center">
      <div className="text-container">
        <h5 className="header-h3 mb-2">{intl.formatMessage({ id: 'app.general.summary' })}</h5>
      </div>
      <React.Fragment>
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
        {userResult?.value.length ? (
          <div className="image-container-md">
            <img src={getProfile(userResult.value)} className="img-fluid" alt="illustration" />
          </div>
        ) : null}
      </React.Fragment>
      <EmailField />
      <HomeButton />
    </section>
  );
};

export default ResultPage;
