export function encode(str: string) {
	return window?.btoa(unescape(encodeURIComponent(str)))
}

export function decode(str: string) {
	if (!str || str == 'undefined' || str.includes('+')) {
		return ''
	}
	return !!str && str != 'undefined' ? decodeURIComponent(escape(window?.atob(str))) : ''
}
