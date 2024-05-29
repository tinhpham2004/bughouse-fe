import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export const Log = (response: AxiosResponse) => {
	switch (response.config.method) {
		case 'get': {
			return console.log(
				`%c GET --> ${response.request.responseURL}\n Data-->`,
				'background: #222; color: #0a95ff; font-style: italic',
				response.data
			)
		}

		case 'post': {
			return (
				console.log(
					`%c POST --> ${response.request.responseURL} \n Data-->`,
					'background: #222; color: #bada55; font-style: italic'
				),
				response.data
			)
		}

		case 'put': {
			return console.log(
				`%c PUT --> ${response.request.responseURL}\n Data-->`,
				'background: #222; color: #ffc107; font-style: italic',
				response.data
			)
		}

		case 'patch': {
			return console.log(
				`%c PATCH --> ${response.request.responseURL}\n Data-->`,
				'background: #222; color: #6f42c1; font-style: italic',
				response.data
			)
		}

		case 'delete': {
			return console.log(
				`%c DELETE --> ${response.request.responseURL}\n Data-->`,
				'background: #222; color: #dc3545; font-style: italic',
				response.data
			)
		}

		default: {
			return (
				console.log(
					`%c POST --> ${response.request.responseURL} \n Data-->`,
					'background: #222; color: #bada55; font-style: italic'
				),
				response.data
			)
		}
	}
}

export const LogError = (error: AxiosError<any>): void => {
	const status = error.response?.status ?? 'Unknown'
	const statusText = error.response?.statusText ?? 'Unknown'
	const requestUrl = (error.config && error?.config.url) ?? 'Unknown'

	console.log(
		`%c ERROR --> ${
			error?.config && error.config.method?.toUpperCase()
		} --> ${requestUrl}\n Status --> ${status} ${statusText}\n`,
		'background: #222; color: #dc3545; font-style: italic',
		error.response?.data ?? error.message
	)
}

export const LogRequest = (config: AxiosRequestConfig): void => {
	const fullUrl = `${config.baseURL}${config.url}`
	return console.log(
		`%c REQUEST --> ${config.method?.toUpperCase()} --> ${fullUrl}\n Payload Data Request-->`,
		'background: #222; color: #0a95ff; font-style: italic',
		config.data
	)
}

export const LogResponse = (response: AxiosResponse): void => {
	const fullUrl = `${response.config.baseURL}${response.config.url}`
	return console.log(
		`%c RESPONSE --> ${response.config.method?.toUpperCase()} --> ${fullUrl}\n Data-->`,
		'background: #222; color: #00FFAB; font-style: italic, fontWeight: bold',
		response
	)
}
