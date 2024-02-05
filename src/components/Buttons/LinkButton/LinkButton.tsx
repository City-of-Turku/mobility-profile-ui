import React from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { LinkButtonProps } from '../../../types';

const LinkButton = ({ urlValue, translationId, isActive }: LinkButtonProps) => {
  const intl = useIntl();
  return (
    <div className="button-container">
      <Link to={`/${urlValue}`}>
        <Button
          role="button"
          type="button"
          disabled={!isActive}
          aria-disabled={!isActive}
          className="button-primary p-2"
          aria-label={intl.formatMessage({ id: translationId })}
        >
          <p className="text-normal">{intl.formatMessage({ id: translationId })}</p>
        </Button>
      </Link>
    </div>
  );
};

export default LinkButton;
