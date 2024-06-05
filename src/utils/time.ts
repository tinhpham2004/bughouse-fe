export const getCurrentDate = () => {
	const date = new Date()
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	return {
		day,
		month,
		year,
	}
}

export function formatDate(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false, // set to true if you want 12-hour format instead of 24-hour format
	}
	return date.toLocaleString('en-GB', options)
}

export function formatDDMMYYYY(date: Date): string {
	const day = date.getDate().toString().padStart(2, '0') // Get the day of the month and pad it with a leading zero if necessary
	const month = (date.getMonth() + 1).toString().padStart(2, '0') // Get the month (which is zero-indexed) and add 1 to it, then pad it with a leading zero if necessary
	const year = date.getFullYear().toString() // Get the full year as a string

	return `${day}/${month}/${year}` // Combine the day, month, and year with forward slashes
}

// Input: ISO 8601 date string
// Output: DD.MM.YYYY
export function formatDateToDDMMYYY(input: string): string {
	const date = new Date(input)
	const day = date.getDate().toString().padStart(2, '0') // Get the day of the month and pad it with a leading zero if necessary
	const month = (date.getMonth() + 1).toString().padStart(2, '0') // Get the month (which is zero-indexed) and add 1 to it, then pad it with a leading zero if necessary
	const year = date.getFullYear().toString() // Get the full year as a string

	return `${day}.${month}.${year}` // Combine the day, month, and year with forward slashes
}

// Input: ISO 8601 date string
// Output: DD/MM/YYYY
export function formatDateToMMDDYYYYSlash(input: string): string {
	const date = new Date(input)

	const day = ('0' + date.getDate()).slice(-2)
	const month = ('0' + (date.getMonth() + 1)).slice(-2) // Note: JavaScript counts months from 0 (January) to 11 (December), so we add 1.
	const year = date.getFullYear()

	return `${month}/${day}/${year}`
}
