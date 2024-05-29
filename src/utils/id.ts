export function generateVietnameseId(): string {
	const year = getRandomIntInclusive(0, 99).toString().padStart(2, '0')
	const month = getRandomIntInclusive(1, 12).toString().padStart(2, '0')
	const day = getRandomIntInclusive(1, 28).toString().padStart(2, '0') // Note: Vietnam uses the Gregorian calendar, which has a maximum of 28 days in February
	const threeRandomDigits = getRandomIntInclusive(0, 999).toString().padStart(3, '0')
	const genderDigit = getRandomIntInclusive(0, 1).toString() // 0 for female, 1 for male
	const checkDigit = generateCheckDigit(year + month + day + threeRandomDigits + genderDigit)
	return year + month + day + threeRandomDigits + genderDigit + checkDigit
}

function getRandomIntInclusive(min: number, max: number): number {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateCheckDigit(idDigits: string): string {
	const weights = [2, 7, 9, 10, 5, 8, 4, 2, 7, 9]
	let sum = 0
	for (let i = 0; i < weights.length; i++) {
		sum += parseInt(idDigits.charAt(i)) * weights[i]
	}
	const remainder = sum % 11
	return (remainder < 10 ? remainder : 'X').toString()
}
