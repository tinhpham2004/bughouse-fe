import { IWalletInfo } from './user'

export type FormValuesSignUp = {
	username: string
	email: string
	contactInfo: string
	password: string
	confirmPass: string
}

export type FormValuesSignIn = {
	username: string
	password: string
}

export type FormConfirmOtp = {
	username: string
	otp: string
}

export type ResponseSignIn = {
	accessToken: string
	refreshToken: string
	user: {
		address: {
			city: string
			district: string
			ward: string
			street: string
		}
		_id: string
		username: string
		email: string
		phone: string
		identity: number | string
		name: string
		gender: string
		dob: string
		avatar: string
		notifications: []
		enable: boolean
		socketId: string
		wishList: []
		deleted: boolean
		wallet: IWalletInfo
		createdAt: string
		updatedAt: string
	}
}

export type VerifyType = {
	isVerifiedOtp: boolean
	username: string
	phone: string
	userId: string
	email: string
	otp: string
	avatar: string
	isOTP: boolean
	isIdentity: boolean
}

export interface AuthState {
	isLoading: boolean
	isLogin: boolean
	isDisabled: boolean
	verifyInfo: VerifyType | null
	userInfo: ResponseSignIn
}

export interface IInfoFPT {
	id: number
	id_prob: number
	name: string
	name_prob: number
	dob: string
	dob_prob: number
	sex: string
	sex_prob: string
	nationality: string
	nationality_prob: string
	home: string
	home_prob: number
	address: string
	address_prob: string | number
	type_new: string
	address_entities: {
		province: string
		district: string
		ward: string
		street: string
	}
	doe: string | number
	doe_prob: string | number
	overall_score: string | number
	type: string
}

export interface IUpdateID {
	data: ResponseSignIn
	status: boolean
	message: string
	errorCode: number | string
}
