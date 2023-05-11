import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const Footer = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.main,
        height: '3rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        left: 0,
        bottom: 0,
      }}
    >
      <Typography variant="subtitle2" sx={{ color: '#ffffff' }}>
        <FormattedMessage id="app.footer" />
      </Typography>
    </div>
  );
};

export default Footer;
