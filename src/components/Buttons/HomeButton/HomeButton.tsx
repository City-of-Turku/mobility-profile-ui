import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const HomeButton = () => {
  return (
    <div className="button-container">
      <Link to="/">
        <Button variant="primary" role="button" type="button" className="p-2">
          <p>
            <FormattedMessage id="app.buttons.back.home" />
          </p>
        </Button>
      </Link>
    </div>
  );
};

export default HomeButton;
