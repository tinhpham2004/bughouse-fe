import { IContractItem } from './contract'
import { IServiceDemandItem } from './services'

export interface IInvoice {
	contractId: string
	invoiceInfo: {
		listServiceDemands: string[]
	}
}

export interface IServiceDemaind {
	_id: string
	oldIndicator: number
	newIndicator: number
	service: string
	quality: number
	amount: number
	atMonth: number
	atYear: number
	type: number
	enable: boolean
	createdAt: string
	updatedAt: string
}

export interface IResInvoice {
	vat: 0.1
	payStatus: string
	amount: number
	paymentMethod: number
	enable: boolean
	_id: string
	serviceDemands: [string]
}

export type statusPay = 'Pending' | 'Complete' | 'Failed' | 'Declined' | 'Cancelled' | 'Refunsed'

export interface IInvoiceItem {
	_id: string
	contract: IContractItem
	vat: number
	amount: number
	payStatus: statusPay
	paymentMethod: string
	paymentDate: string
	startDate: string
	endDate: string
	enable: true
	createdAt: string
	updatedAt: string
	hash: string
	txhash: string
	isExtends: boolean
}
