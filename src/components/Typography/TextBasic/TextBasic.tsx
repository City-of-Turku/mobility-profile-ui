import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TextBasicProps } from '../../../types';

const TextBasic = ({ isTitle, text }: TextBasicProps) => {
  const theme = useTheme();
  return (
    <div className="text-container">
      <Typography
        component={isTitle ? 'h3' : 'p'}
        variant={isTitle ? 'subtitle1' : 'body2'}
        sx={{ m: '0.1rem', ...theme.typography.body2 }}
      >
        <FormattedMessage id={text} />
      </Typography>
    </div>
  );
};

export default TextBasic;
