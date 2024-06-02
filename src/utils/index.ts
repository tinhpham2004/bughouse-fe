import { string } from 'yup'

export const getPathNameAfterSlah = (pathName: string) => {
	const arrayPath = pathName.split('/')

	return arrayPath[arrayPath.length - 1]
}

export const randomId = () => {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}
	return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

export const itemData = [
	{
		img: 'https://bayleaf.s3.amazonaws.com/property-images%2F1673341812709_IMG_5285.JPG',
		title: 'Breakfast',
		rows: 2,
		cols: 2,
	},
	{
		img: 'https://bayleaf.s3.amazonaws.com/property-images%2F1673341812709_IMG_5286.JPG',
		title: 'Burger',
		rows: 2,
		cols: 2,
	},
	{
		img: 'https://bayleaf.s3.amazonaws.com/property-images%2F1673341812707_IMG_5284.JPG',
		title: 'Camera',
		rows: 2,
		cols: 2,
	},
	{
		img: 'https://bayleaf.s3.amazonaws.com/property-images%2F1673341812709_IMG_5287.JPG',
		title: 'Coffee',
		cols: 2,
		rows: 2,
	},
]

export const ArrayFrom = (to: number) => {
	return Array.from(Array(to).keys())
}

export function maskEmail(email: string): string {
	const [username, domain] = email.split('@')
	const maskedUsername = `${username.charAt(0)}${'*'.repeat(username.length - 2)}${username.slice(-1)}`
	const maskedDomain = `${domain.charAt(0)}${'*'.repeat(domain.length - 2)}${domain.slice(-1)}`
	return `${maskedUsername}@${maskedDomain}`
}

export function maskPhone(phone: string): string {
	const maskedPhone = phone.replace(/\d(?=\d{4})/g, '*') // Replace all but the last 4 digits with asterisks
	return maskedPhone
}

export function getNameVietNamese(fullName: string) {
	const names = fullName.trim().split(' ')
	if (names.length <= 1) {
		return names[0]
	}
	return names[names.length - 2] + ' ' + names[names.length - 1]
}

export function convertPhone84(phoneNumber: string) {
	phoneNumber = phoneNumber.replace(/\D/g, '') // Remove all non-numeric characters
	if (phoneNumber.length === 10) {
		phoneNumber = '+84' + phoneNumber.substr(1) // Prepend the country code and remove the leading "0"
	} else if (phoneNumber.length === 11) {
		phoneNumber = '+84' + phoneNumber.substr(2) // Prepend the country code and remove the leading "0"
	}
	return phoneNumber
}

export function convertToTitleCase(str: string): string {
	return str
		.split('_') // Split the string at each underscore
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
		.join(' ') // Join the words back together with a space
}

export function convertStringToTitleCase(input: string): string {
	// Split the input string by underscores or hyphens
	const words = input.split(/[_-]/)

	// Capitalize the first letter of each word and join them with a space
	const titleCase = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

	return titleCase
}

export function convertSexToValidGender(sex: string): string {
	switch (sex) {
		case 'NAM':
			return 'Man'
		case 'NỮ':
			return 'Female'
		default:
			return 'Other'
	}
}
