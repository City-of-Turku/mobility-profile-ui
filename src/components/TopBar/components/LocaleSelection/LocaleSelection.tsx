import { ButtonBase, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import settingsSlice from '../../../../redux/slices/settingsSlice';

const LocaleSelection: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { setLocaleSelection } = bindActionCreators(settingsSlice.actions, dispatch);

  const { settings } = useAppSelector((state) => state);
  const locale = settings.localeSelection;

  const handleChange = (lng: string) => {
    return setLocaleSelection(lng);
  };

  const setFontWeight = (langId: string) => {
    if (langId === locale) {
      return '700';
    }
    return '400';
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
    <div
      style={{
        backgroundColor: '#000000',
        height: '3rem',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1rem',
      }}
    >
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
                fontWeight: setFontWeight(item.id),
              }}
            >
              {item.label}
            </Typography>
          </ButtonBase>
        ))}
      </nav>
    </div>
  );
};

export default LocaleSelection;
