import { AppBar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import LocaleSelection from './components/LocaleSelection/LocaleSelection';

const TopBar = () => {
  const theme = useTheme();
  return (
    <>
      <LocaleSelection />
      <div
        style={{
          backgroundColor: theme.palette.primary.main,
          height: '4rem',
          paddingLeft: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div>
          <Typography
            component="h2"
            variant="h2"
            sx={{ mb: '0.3rem', color: '#ffff', ...theme.typography.h2 }}
          >
            <FormattedMessage id="app.title" />
          </Typography>
        </div>
      </div>
    </>
  );
};

export default TopBar;
