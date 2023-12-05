import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import capercaillieImg from '../../../assets/images/capercaillie.webp';
import deerImg from '../../../assets/images/deer.webp';
import foxImg from '../../../assets/images/fox.webp';
import martenImg from '../../../assets/images/marten.webp';
import mooseImg from '../../../assets/images/moose.webp';
import rabbitImg from '../../../assets/images/rabbit.webp';
import { Result } from '../../../types';
import { fetchProfileResults } from '../../../utils/mobilityProfileAPI';
import useLocaleText from '../../../utils/useLocaleText';
import { renderLocaleValue } from '../../../utils/utils';
import HomeButton from '../../Buttons/HomeButton/HomeButton';

//TODO update to show survey results to user, finalize texts & styles

const ResultPage = () => {
  const [profileResults, setProfileResults] = useState<Array<Result>>([]);

  const intl = useIntl();

  const getLocaleText = useLocaleText();

  useEffect(() => {
    fetchProfileResults(setProfileResults);
  }, []);

  // TODO get this from data
  const profileValue = 'Nokkela Näätä';

  const profileResult: Result[] = profileResults.reduce((acc: Result[], curr: Result) => {
    if (curr.value === profileValue) {
      acc.push(curr);
    }
    return acc;
  }, []);

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
      {profileResult?.map((item) => (
        <React.Fragment key={item.id}>
          <div className="text-container mb-2">
            <p className="header-h4">
              {renderLocaleValue(getLocaleText, item.value_fi, item.value_en, item.value_sv)}
            </p>
          </div>
          <div className="text-container mb-2">
            <p className="text-normal">
              {renderLocaleValue(
                getLocaleText,
                item.description_fi,
                item.description_en,
                item.description_sv,
              )}
            </p>
          </div>
          <div className="image-flex-container">
            <img src={getProfile(item.value)} className="img-fluid" alt="illustration" />
          </div>
        </React.Fragment>
      ))}
      <HomeButton />
    </section>
  );
};

export default ResultPage;
