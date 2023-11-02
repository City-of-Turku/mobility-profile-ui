import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import bgImage from '../../../assets/images/mobility-profile-up.webp';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import userSlice from '../../../redux/slices/userSlice';
import { startPoll } from '../../../utils/mobilityProfileAPI';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { setUserId, setCsrfToken } = bindActionCreators(userSlice.actions, dispatch);

  const intl = useIntl();

  const handleClick = async () => {
    const userValues = await startPoll();
    setUserId(userValues?.id);
    setCsrfToken(userValues?.csrf_token);
  };

  return (
    <div className="home-content">
      <div className="wrap-all container-wrap">
        <div className="container">
          <div className="txt-container">
            <h1 className="header-h1 mb-3">{intl.formatMessage({ id: 'page.home.title' })}</h1>
            <h2 className="header-h2 mb-3">{intl.formatMessage({ id: 'page.home.subTitle' })}</h2>
            <p className="text-normal mb-3">
              {intl.formatMessage({ id: 'page.home.description' })}
            </p>
          </div>
          <div className="button-container">
            <Link to="/questions">
              <Button
                className="button-primary p-2"
                role="button"
                aria-label={intl.formatMessage({ id: 'app.buttons.survey.start' })}
                onClick={() => handleClick()}
              >
                <p className="text-subtitle">
                  {intl.formatMessage({ id: 'app.buttons.survey.start' })}
                </p>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="image-container">
        <img className="image" src={bgImage} alt="turku-illustration" />
      </div>
    </div>
  );
};

export default HomePage;
