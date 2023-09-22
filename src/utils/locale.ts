import messagesEn from '../i18n/en.json';
import messagesFi from '../i18n/fi.json';
import messagesSv from '../i18n/sv.json';

/**
 * LocaleUtility class is a helper object for handling locale
 * related functionality.
 */
class LocaleUtility {
  // Default locale
  static defaultLocale = 'fi';

  // Translation messages
  static messages = {
    fi: messagesFi,
    en: messagesEn,
    sv: messagesSv,
  };

  static availableLocales = Object.keys(LocaleUtility.messages);

  // Figure out if give locale is valid locale
  static isValidLocale = (locale: string) =>
    locale && Object.hasOwn(LocaleUtility.messages, locale);

  // Get data object with locale and messages (for React Intl)
  static intlData = (locale: string) => {
    const newLocale = LocaleUtility.isValidLocale(locale) ? locale : LocaleUtility.defaultLocale;
    const newMessages = LocaleUtility.isValidLocale(locale)
      ? LocaleUtility.messages[locale as keyof LocaleUtility]
      : LocaleUtility.messages[LocaleUtility.defaultLocale as keyof LocaleUtility];
    return {
      locale: newLocale,
      messages: newMessages,
    };
  };
}

export default LocaleUtility;
