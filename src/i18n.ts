import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import * as englishLang from "./translations/en/common.json";
import * as swedishLang from "./translations/ch/common.json";

void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: englishLang,
            },
            ch: {
                translation: swedishLang,
            },
        },
    });

export default i18n;
