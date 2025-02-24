import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar.json"; // Import your Arabic translations
import en from "./locales/en.json"; // Import your English translations

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: en, // English translations
		},
		ar: {
			translation: ar, // Arabic translations
		},
	},
	lng: "ar", // Default language
	fallbackLng: "en", // Fallback language
	interpolation: {
		escapeValue: false, // React already escapes values
	},
});

export default i18n;
