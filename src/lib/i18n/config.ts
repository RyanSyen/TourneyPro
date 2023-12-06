import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import global_en from 'lib/i18n/locales/en/global.json';
import global_ms from 'lib/i18n/locales/ms/global.json';
import global_zh from 'lib/i18n/locales/zh/global.json';
import { initReactI18next } from 'react-i18next';

i18next
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    interpolation: { escapeValue: false }, // not needed for react as it escapes by default
    // lng: 'auto', // auto detect lang based on user's browser lang, turn off for language detector to work
    // fallbackLng: 'en', // if auto detect fail or translation not found then default will be English
    fallbackLng: ['en', 'ms', 'zh'],
    debug: false,
    resources: {
      en: {
        global: global_en,
      },
      zh: {
        global: global_zh,
      },
      ms: {
        global: global_ms,
      },
    },
  });

export default i18next;
