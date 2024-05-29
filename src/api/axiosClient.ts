import { setUserInfo, setVerifiedInfo } from '@/app/authSlice'
import { LogError, LogRequest, LogResponse } from './../utils/logs'
import ShowNostis from '@/utils/show-noti'
import { NOT_AUTHORIZED } from '@/constants/index'
import { ResponseSignIn } from '@/models/auth'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import queryString from 'query-string'
import { store } from '@/app/store'

const createAxiosInstance = () => {
	const axiosInstance: AxiosInstance = axios.create({
		baseURL: import.meta.env.VITE_BASEURL,
		headers: {
			'Content-Type': 'application/json',
		},
		paramsSerializer: {
			serialize: (params) => queryString.stringify(params),
		},
	})

	axiosInstance.interceptors.response.use(
		(response) => {
			LogResponse(response)

			if (response && response.data) {
				return response.data
			}

			return response
		},
		(error: AxiosError<unknown>) => {
			LogError(error)

			if (error.response?.status === NOT_AUTHORIZED) {
				deleteToken()
			}

			return Promise.reject<{ data: { message: string } }>(error.response)
		}
	)

	axiosInstance.interceptors.request.use(
		async (config: InternalAxiosRequestConfig) => {
			// Do something before request is sent
			LogRequest(config)
			const loginData = localStorage.getItem('dataUser')
			if (loginData) {
				const data = JSON.parse(loginData) as ResponseSignIn
				// @ts-ignore
				config.headers = { ...config.headers, Authorization: data.accessToken }
			}
			return config
		},
		function (error) {
			LogError(error)
			// Do something with request error
			return Promise.reject(error)
		}
	)

	return axiosInstance
}
export const deleteToken = () => {
	localStorage.removeItem('dataUser')
	localStorage.removeItem('dataVerified')
	store.dispatch(setUserInfo(null))
	store.dispatch(setVerifiedInfo(null))
	return ShowNostis.error('Login expired !!! ')
}

export default createAxiosInstance()
