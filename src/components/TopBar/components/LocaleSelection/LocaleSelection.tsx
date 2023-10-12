import { bindActionCreators } from '@reduxjs/toolkit';
import React from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import settingsSlice from '../../../../redux/slices/settingsSlice';
import LocaleUtility from '../../../../utils/locale';

const LocaleSelection: React.FC = () => {
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
          <Button
            key={currentLocale}
            variant="link"
            role="link"
            lang={currentLocale}
            aria-current={currentLocale === locale ? 'true' : false}
            onClick={() => handleChange(currentLocale)}
          >
            <p
              className={`mb-2 pl-2 ${currentLocale === locale ? 'header-h6' : 'text-normal'}`}
              style={{ color: currentLocale === locale ? '#fff' : '#DEDEF1' }}
            >
              <FormattedMessage id={`app.general.language.${currentLocale}`} />
            </p>
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default LocaleSelection;
