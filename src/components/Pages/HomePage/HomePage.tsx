import { Button, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import bgImage from '../../../assets/images/mobility-profile-up.png';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import userSlice from '../../../redux/slices/userSlice';
import { startPoll } from '../../../utils/mobilityProfileAPI';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { setUserId, setCsrfToken } = bindActionCreators(userSlice.actions, dispatch);

  const theme = useTheme();

  const handleClick = async () => {
    const userValues = await startPoll();
    setUserId(userValues.id);
    setCsrfToken(userValues.csrf_token);
  };

  return (
    <div className="home-content">
      <div className="wrap-all container-wrap">
        <div className="container">
          <div className="txt-container">
            <Typography component="h3" sx={{ mb: theme.spacing(1.25), ...theme.typography.h1 }}>
              <FormattedMessage id="page.home.title" />
            </Typography>
            <Typography component="h4" sx={{ mb: theme.spacing(1.25), ...theme.typography.h2 }}>
              <FormattedMessage id="page.home.subTitle" />
            </Typography>
            <Typography component="p" sx={{ mb: theme.spacing(1.25), ...theme.typography.body2 }}>
              <FormattedMessage id="page.home.description" />
            </Typography>
          </div>
          <div className="button-container">
            <Link to="/questions">
              <StyledButton variant="contained" onClick={() => handleClick()}>
                <FormattedMessage id="app.buttons.survey.start" />
              </StyledButton>
            </Link>
          </div>
        </div>
      </div>
      <div className="image-container">
        <img className="image" src={bgImage} alt="turku" />
      </div>
    </div>
  );
};

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  backgroundColor: theme.palette.primary.main,
  ...theme.typography.body2,
}));

export default HomePage;
