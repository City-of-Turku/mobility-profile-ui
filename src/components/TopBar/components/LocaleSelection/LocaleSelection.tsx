import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import settingsSlice from '../../../../redux/slices/settingsSlice';
import LocaleUtility from '../../../../utils/locale';

const LocaleSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setLocaleSelection } = bindActionCreators(settingsSlice.actions, dispatch);

  const { localeSelection } = useAppSelector((state) => state.settings);

  const intl = useIntl();

  const handleChange = (lng: string) => {
    return setLocaleSelection(lng);
  };

  return (
    <div className="locale-header">
      <nav className="locale-list">
        {LocaleUtility.availableLocales.map((currentLocale) => (
          <Button
            key={currentLocale}
            className="button-locale"
            variant="link"
            role="link"
            lang={currentLocale}
            tabIndex={0}
            aria-current={currentLocale === localeSelection ? 'true' : false}
            aria-label={intl.formatMessage({ id: `app.general.language.${currentLocale}` })}
            onClick={() => handleChange(currentLocale)}
          >
            <p
              className={`mb-1 pl-2 ${
                currentLocale === localeSelection ? 'text-normal-bold' : 'text-normal'
              }`}
              style={{ color: currentLocale === localeSelection ? '#fff' : '#DEDEF1' }}
            >
              {intl.formatMessage({ id: `app.general.language.${currentLocale}` })}
            </p>
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default LocaleSelection;
