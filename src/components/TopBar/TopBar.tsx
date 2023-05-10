import { AppBar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import LocaleSelection from './components/LocaleSelection/LocaleSelection';

const TopBar = () => {
  const theme = useTheme();
  return (
    <AppBar>
      <LocaleSelection />
      <div style={{ backgroundColor: theme.palette.primary.main }}>
        <div style={{ padding: '0.7rem' }}>
          <Typography
            component="h2"
            variant="h2"
            sx={{ mb: '0.3rem', color: '#ffff', ...theme.typography.h2 }}
          >
            Mobility Profile
          </Typography>
        </div>
      </div>
    </AppBar>
  );
};

export default TopBar;
