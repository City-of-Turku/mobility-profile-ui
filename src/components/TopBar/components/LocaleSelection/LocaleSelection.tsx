import { ButtonBase, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import settingsSlice from '../../../../redux/slices/settingsSlice';

const LocaleSelection: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { setLocaleSelection } = bindActionCreators(settingsSlice.actions, dispatch);

  const handleChange = (lng: string) => {
    return setLocaleSelection(lng);
  };

  const languages = [
    {
      id: 'fi',
      label: 'Suomeksi',
    },
    {
      id: 'en',
      label: 'In English',
    },
    {
      id: 'sv',
      label: 'På svenska',
    },
  ];

  return (
    <Toolbar sx={{ backgroundColor: '#000000' }}>
      <nav style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {languages.map((item) => (
          <ButtonBase key={item.id} role="button" onClick={() => handleChange(item.id)}>
            <Typography
              component="p"
              variant="subtitle2"
              sx={{
                mb: '0.3rem',
                pl: '0.7rem',
                color: '#ffffff',
                fontSize: theme.typography.body1.fontSize,
              }}
            >
              {item.label}
            </Typography>
          </ButtonBase>
        ))}
      </nav>
    </Toolbar>
  );
};

export default LocaleSelection;
