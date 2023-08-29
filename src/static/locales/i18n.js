import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from './en-US/common.json';
import zhTW from './zh-TW/common.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enUS },
    zh: { translation: zhTW },
  },
  lng: 'zh-TW',
  fallbackLng: 'zh-TW',
  interpolation: {
    escapeValue: false,
  }
});