import { IInvoice, IResInvoice } from '@/models/Invoice'
import axiosClient from './axiosClient'

const BASES_URL = '/invoice'

export const invoiceApi = {
	createInvoice(params: IInvoice) {
		return axiosClient.post<IResInvoice>(`${BASES_URL}/create`, params)
	},

	payInvoice(invoiceId: string) {
		return axiosClient.post(`${BASES_URL}/${invoiceId}/payment`)
	},

	extendInvoice(invoiceId: string) {
		return axiosClient.post(`${BASES_URL}/${invoiceId}/extends`)
	},
}
