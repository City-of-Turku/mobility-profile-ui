import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

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
      <div className="button-container mt-2">
        <Link to="/">
          <Button variant="contained">Palaa etusivulle</Button>
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;
