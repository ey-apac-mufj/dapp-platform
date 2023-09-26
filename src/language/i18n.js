// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en.json";
import jpTranslation from "./locales/jp.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: "en", // Default language
    fallbackLng: "en",
    resources: {
      en: {
        translation: enTranslation,
      },
      jp: {
        translation: jpTranslation,
      },
      // Add more languages here
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
