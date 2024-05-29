export function formatVietNamDong(amount: number): string {
	if (amount >= 1000000) {
		const amountInTrillion: number = Math.floor(amount / 1000000)
		const amountInBillion: number = Math.floor((amount % 1000000) / 1000)
		const formattedAmount: string = `${amountInTrillion}tr${amountInBillion !== 0 ? `${amountInBillion}` : ''} vnđ`
		return formattedAmount
	} else {
		const formattedAmount: string = `${amount.toLocaleString()} vnđ`
		return formattedAmount
	}
}

export function convertToDoLa(amountInUSD: number | undefined) {
	if (!amountInUSD) return `0 vnđ`
	const exchangeRate = 23577
	const amountInVND = amountInUSD * exchangeRate
	const formattedAmount = `${amountInVND.toFixed(0)} vnđ`
	return formattedAmount
}

export function convertVNDtoUSD(amountVND: number): string {
	if (!amountVND) return `$0`
	const exchangeRate = 23577 // Exchange rate as of my knowledge cutoff in September 2021
	const amountUSD = amountVND / exchangeRate
	return `$${amountUSD.toFixed(2)}`
}

export function convertMoneyToVndText(money: number | undefined): string {
	if (!money) return '0k'
	if (money < 1000) {
		return `${money}`
	} else if (money < 10000) {
		return `${Math.floor(money / 1000)}k`
	} else if (money < 1000000) {
		return `${Math.floor(money / 1000)}k`
	} else if (money < 1000000000) {
		const millions = Math.floor(money / 1000000)
		const remainder = money % 1000000
		if (remainder === 0) {
			return `${millions}tr`
		} else {
			const thousands = Math.floor(remainder / 1000)
			return `${millions}tr${thousands !== 0 ? `${thousands}` : ''}`
		}
	} else {
		return `${money}`
	}
}
