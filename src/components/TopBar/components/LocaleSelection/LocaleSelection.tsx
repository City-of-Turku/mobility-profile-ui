import { ButtonBase, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import settingsSlice from '../../../../redux/slices/settingsSlice';
import LocaleUtility from '../../../../utils/locale';

const LocaleSelection: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { setLocaleSelection } = bindActionCreators(settingsSlice.actions, dispatch);

  const { settings } = useAppSelector((state) => state);
  const locale = settings.localeSelection;

  const handleChange = (lng: string) => {
    return setLocaleSelection(lng);
  };

  return (
    <div className="locale-header">
      <nav className="locale-list">
        {LocaleUtility.availableLocales.map((currentLocale) => (
          <ButtonBase
            key={currentLocale}
            role="button"
            lang={currentLocale}
            aria-current={currentLocale === locale ? 'true' : false}
            onClick={() => handleChange(currentLocale)}
          >
            <Typography
              component="p"
              variant="subtitle2"
              sx={{
                mb: '0.3rem',
                pl: '0.7rem',
                color: currentLocale === locale ? '#ffffff' : '#DEDEF1',
                fontSize: theme.typography.body1.fontSize,
                fontWeight: currentLocale === locale ? '700' : '400',
              }}
            >
              <FormattedMessage id={`app.general.language.${currentLocale}`} />
            </Typography>
          </ButtonBase>
        ))}
      </nav>
    </div>
  );
};

export default LocaleSelection;
