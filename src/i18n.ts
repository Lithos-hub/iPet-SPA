import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n
  .use(detector)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnNull: false,
    lng: "es",
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
