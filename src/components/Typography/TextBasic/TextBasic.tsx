import React from 'react';
import { useIntl } from 'react-intl';
import { TextBasicProps } from '../../../types';

const TextBasic = ({ translationId }: TextBasicProps) => {
  const intl = useIntl();

  return (
    <div className="mt-2">
      <p className="text-normal">{intl.formatMessage({ id: translationId })}</p>
    </div>
  );
};

export default TextBasic;
