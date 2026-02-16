import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en-translations';

export const i18nInit = () => {
  i18next.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources: {
      en: {
        translation: en,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

