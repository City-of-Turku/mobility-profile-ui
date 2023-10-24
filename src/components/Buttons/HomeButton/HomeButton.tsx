import React from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const HomeButton = () => {
  const intl = useIntl();

  return (
    <div className="button-container">
      <Link to="/">
        <Button
          role="button"
          type="button"
          className="button-primary p-2"
          aria-label={intl.formatMessage({ id: 'app.buttons.back.home' })}
        >
          <p className="text-normal">{intl.formatMessage({ id: 'app.buttons.back.home' })}</p>
        </Button>
      </Link>
    </div>
  );
};

export default HomeButton;
