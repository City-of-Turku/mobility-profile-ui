import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import userSlice from '../../../redux/slices/userSlice';

const HomeButton = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { setIsLoggedIn } = bindActionCreators(userSlice.actions, dispatch);

  const { user } = useAppSelector((state) => state);
  const token = user.csrfToken;

  const endPoll = () => {
    if (token?.length) {
      setIsLoggedIn(false);
    }
    return;
  };

  return (
    <div className="button-container">
      <Link to="/">
        <Button
          role="button"
          type="button"
          className="button-primary p-2"
          aria-label={intl.formatMessage({ id: 'app.buttons.back.home' })}
          onClick={() => endPoll()}
        >
          <p className="text-normal">{intl.formatMessage({ id: 'app.buttons.back.home' })}</p>
        </Button>
      </Link>
    </div>
  );
};

export default HomeButton;
