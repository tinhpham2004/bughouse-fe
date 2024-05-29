import {
	FormConfirmOtp,
	FormValuesSignIn,
	FormValuesSignUp,
	IInfoFPT,
	IUpdateID,
	ResponseSignIn,
	VerifyType,
} from '@/models/auth'
import axiosClient from './axiosClient'

const BASES_URL = '/auth'

export const authApi = {
	login(params: FormValuesSignIn) {
		return axiosClient.post<ResponseSignIn | VerifyType>(`${BASES_URL}/login`, params)
	},

	register(params: FormValuesSignUp) {
		return axiosClient.post(`${BASES_URL}/registry`, params)
	},

	resetOtp(params: Omit<FormValuesSignIn, 'password'>) {
		return axiosClient.post<any>(`${BASES_URL}/reset-otp`, params)
	},

	confirmOtp(params: FormConfirmOtp) {
		return axiosClient.post(`${BASES_URL}/confirm-account`, params)
	},

	verifyEmail() {
		return axiosClient.post(`${BASES_URL}/verify-email`, {})
	},

	verifyInfo(params: IInfoFPT) {
		return axiosClient.put<IUpdateID>(`${BASES_URL}/verify-info`, params)
	},
}
