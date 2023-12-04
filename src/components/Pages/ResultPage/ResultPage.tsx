import React from 'react';
import { useIntl } from 'react-intl';
import capercaillieImg from '../../../assets/images/capercaillie.webp';
import deerImg from '../../../assets/images/deer.webp';
import foxImg from '../../../assets/images/fox.webp';
import martenImg from '../../../assets/images/marten.webp';
import mooseImg from '../../../assets/images/moose.webp';
import rabbitImg from '../../../assets/images/rabbit.webp';
import useLocaleText from '../../../utils/useLocaleText';
import { renderLocaleValue } from '../../../utils/utils';
import HomeButton from '../../Buttons/HomeButton/HomeButton';

//TODO update to show survey results to user, finalize texts & styles

const ResultPage = () => {
  const intl = useIntl();

  const getLocaleText = useLocaleText();

  // TODO take this values from data
  const item = {
    id: 8,
    value: 'Käytännöllinen Kettu',
    value_fi: 'Käytännöllinen Kettu',
    value_sv: 'Rutinerad Räv',
    value_en: 'Faithful Fox',
    description:
      'Matkustaa autolla tottumuksesta, avoin muille matkustusmuodoille, kun hän oppii käyttämään.',
    description_fi:
      'Matkustaa autolla tottumuksesta, avoin muille matkustusmuodoille, kun hän oppii käyttämään.',
    description_sv:
      'Reser med bil av vana, är öppen för andra former av transport när resenären lär sig använda dem.',
    description_en:
      'Travels by car out of habit, open to other modes of travel as he becomes familiar with them.',
  };

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
    <div className="container flex-center">
      <div className="text-container">
        <h5 className="header-h3 mb-2">{intl.formatMessage({ id: 'app.general.summary' })}</h5>
      </div>
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
        <img src={getProfile(item.value)} className="image-profile" alt="illustration" />
      </div>
      <HomeButton />
    </div>
  );
};

export default ResultPage;
