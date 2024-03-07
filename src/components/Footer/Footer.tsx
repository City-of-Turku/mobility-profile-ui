import React from 'react';
import scaleUpLogo from '../../assets/images/scale-up-logo.webp';
import turkuLogo from '../../assets/images/turku-logo-sm.webp';

const Footer = () => {
  return (
    <div className="footer">
      <div className="logo-container">
        <div className="mr-2">
          <img src={turkuLogo} alt="turku-logo" className="img-logo img-fluid" />
        </div>
        <div>
          <img src={scaleUpLogo} alt="scale-up-logo" className="img-logo img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
