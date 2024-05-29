import { IContractItem } from './contract'
import { room } from './room'

export interface IServiceRes {
	_id: string
	oldIndicator: number
	newIndicator: number
	service: IService
	quality: number
	amount: number
	atMonth: number
	atYear: number
	type: number
	enable: boolean
	createdAt: string
	updatedAt: string
}

export interface IService {
	_id: string
	name: string
	description: string
	basePrice: number
	unit: string
}

export interface IDemainService {
	serviceId: string
	quality: number
	newIndicator: number
}

export interface IUpdateServiceParams {
	roomId: string
	demandInfo: {
		atMonth: number | string
		demands: IDemainService[]
	}
}

export interface IResContract {
	contract: IContractItem
}

export interface IServiceDemand {
	listDemand: IServiceDemandItem[]
}

export interface IServiceDemandItem {
	_id: string
	oldIndicator: number
	newIndicator: number
	service: IService
	quality: number
	amount: number
	atMonth: number
	atYear: number
	type: number
	enable: boolean
	createdAt: string
	updatedAt: string
}
