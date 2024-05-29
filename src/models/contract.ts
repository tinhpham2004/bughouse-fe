import { room } from './room'

export interface IContract {
	period: number
	room: string | undefined
	dateRent: string | undefined
	payTime: string | undefined
	payment: number | undefined
	payMode: string | undefined
}

export interface IContractRes {
	period: string
	renter: string
	room: string
	dateRent: string
	payTime: string
	payMode: string
	payment: number
	enable: boolean
	_id: string
	lessor: string
	createdAt: string
	updatedAt: string
	plusContract: string
}

export interface IResContract {
	contract: IContractRes
	contractHash: string
}

export interface ISignContract {
	roomId: string | undefined
	contractHash: string | undefined
}

export interface IContractItem {
	_id: string
	period: number
	lessor: {
		_id: string
		username: string
		email: string
		phone: string
		name: string
		avatar: string
	}
	room: room
	dateRent: string
	payTime: string
	payMode: string
	payment: number
	enable: boolean
	penaltyFeeEndRent: number
	status: string
	plusContract: string
	renter: {
		_id: string
		username: string
		email: string
		phone: string
		name: string
		avatar: string
	}
	createdAt: string
	updatedAt: string
}
