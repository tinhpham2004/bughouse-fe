import axiosClient from './axiosClient'

export const commonApi = {
	uploadImage(params: any) {
		return axiosClient.post(`/images/upload`, params)
	},

	confirmWallet(search: any) {
		return axiosClient.get(`/payment-confirmation${search}`)
	},
}
