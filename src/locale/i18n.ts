import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import vi from './vi.json'

const resources = {
	en: {
		translation: {
			...en,
		},
	},
	vi: {
		translation: {
			...vi,
		},
	},
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: localStorage.getItem('lang') || 'vi',
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	})

export default i18n
