import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import bgImage from '../../../assets/images/mobility-profile-up.png';

const HomePage = () => {
  return (
    <div className="home-content">
      <div className="wrap-all container-wrap">
        <div className="container">
          <div className="txt-container">
            <h3>
              <FormattedMessage id="page.home.title" />
            </h3>
            <h4>
              <FormattedMessage id="page.home.subTitle" />
            </h4>
            <p>
              <FormattedMessage id="page.home.description" />
            </p>
          </div>
          <div className="button-container">
            <Link to="/questions">
              <Button variant="primary">
                <FormattedMessage id="app.buttons.survey.start" />
              </Button>
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

export default HomePage;
