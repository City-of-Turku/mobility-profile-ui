import React from 'react';
import scaleUpLogo from '../../assets/images/scale-up-logo.png';
import turkuLogo from '../../assets/images/turku-logo-sm.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="logo-container">
        <div className="mr-2">
          <img src={turkuLogo} alt="turku-logo" className="img-logo" />
        </div>
        <div>
          <img src={scaleUpLogo} alt="scale-up-logo" className="img-logo" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
