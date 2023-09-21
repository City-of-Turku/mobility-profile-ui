import { Typography } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Footer = () => {
  return (
    <div className="footer text-center">
      <Typography variant="subtitle2" sx={{ color: '#ffffff' }}>
        <FormattedMessage id="app.footer" />
      </Typography>
    </div>
  );
};

export default Footer;
