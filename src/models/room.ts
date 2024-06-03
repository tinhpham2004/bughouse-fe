import { IOwnerInfo, IUser } from './user'

export interface RoomFilters {
	price: {
		min: number
		max: number
	}
	utilities: {}
	typeRoom: {
		all: boolean
		isRent: boolean
		isShareRoom: boolean
		isDormRoom: boolean
		isWholeHouse: boolean
		isApartment: boolean
	}
	sex: {
		male: boolean
		female: boolean
		all: boolean
	}
}

export interface IParamsGetRoom {
	page: number
	limit: number
	range?: {
		form: number
		to: number
	}
	Utilities?: {}
	typeRoom?: string
	gender?: string
	search?: string
	key?: string
	district?: string
}

export interface room {
	_id: string
	name: string
	acreage: number
	nbCurrentPeople: number
	totalNbPeople: number
	gender: string
	typeRoom: string
	deposit: number
	description: string
	amentilities: string[]
	basePrice: number
	roomAttachment: {
		url: string[]
	}
	demandAt?: number
	services: IServiceType[]
	owner: {
		_id: string
		username: string
		email: string
		phone: string
		identity: string
		name: string
		avatar: string
	}
	createdAt: string
	updatedAt: string
	address: AddressType
	period: number
	status?: string
}

export type AddressType = {
	addressDetail: string
	city: string
	district: string
	fullText: string
	street: string
	ward: string
}

export interface IRoomParams {
	name: string
	description: string
	basePrice: number | string
	acreage: number | string
	typeRoom: string
	nbCurrentPeople: number | string
	totalNbPeople: number | string
	deposit: number | string
	gender: string
	cityName: string
	ditrictName: string
	streetName: string
	wardName: string
	addressDetail: string
	roomAttachment: {
		url: string[]
	}
	amentilities: string[]
	services: IServiceType[]
	roomId?: string
}

export interface IServiceType {
	name: string
	description: string
	basePrice: number | string
	unitName: string
}

export interface IpropsRoomMaster {
	dataOwner: IOwnerInfo | undefined
	postDate: string | undefined
}

export interface IResponseRented {
	dateRent: string | undefined
	room: room | undefined
	_id: string | undefined
	lessor: IUser | undefined
	renter: IUser | undefined
}

export interface IResponseLessed {
	room: room
}

export interface IReOpenRoom {
	basePrice: number | string
	typeRoom: string
	totalNbPeople: number | string
	deposit: number | string
	gender: string
	roomId?: string
}

export interface IRoomFeedback {
	_id: string
	user: IUser
	content: string
	rating: number
	room: {
		_id: string
		name: string
	}
	images: []
	totalLikes: number
	enable: boolean
	createdAt: string
	updatedAt: string
}
