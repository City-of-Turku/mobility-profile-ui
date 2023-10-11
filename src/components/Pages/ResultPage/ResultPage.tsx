import { Typography } from '@mui/material';
import React from 'react';
import HomeButton from '../../Buttons/HomeButton/HomeButton';

// TODO update to show survey results to user, finalize texts & styles

const ResultPage = () => {
  return (
    <div className="container flex-center">
      <div className="text-container">
        <Typography variant="h5" component="h5" gutterBottom>
          Tulokset
        </Typography>
      </div>
      <div className="text-container">
        <Typography variant="body2" component="p" gutterBottom sx={{ fontSize: '1rem' }}>
          Kyselyn tulokset näkyvät täällä.
        </Typography>
      </div>
      <HomeButton />
    </div>
  );
};

export default ResultPage;
