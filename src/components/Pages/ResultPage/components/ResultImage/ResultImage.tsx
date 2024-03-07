import React from 'react';
import capercaillieImg from '../../../../../assets/images/capercaillie.webp';
import deerImg from '../../../../../assets/images/deer.webp';
import foxImg from '../../../../../assets/images/fox.webp';
import martenImg from '../../../../../assets/images/marten.webp';
import mooseImg from '../../../../../assets/images/moose.webp';
import rabbitImg from '../../../../../assets/images/rabbit.webp';
import { ResultImageProps } from '../../../../../types';

const ResultImage = ({ topic }: ResultImageProps) => {
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

  return (
    <div className="image-container-md">
      <img src={getProfile(topic)} className="img-fluid" alt="illustration" />
    </div>
  );
};

export default ResultImage;
