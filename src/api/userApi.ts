import { IInvoiceItem } from '@/models/Invoice'
import { INotification } from '@/models/notification'
import { IRequest } from '@/models/request'
import { IResContract } from '@/models/services'
import { IResUserWallet, ITransaction, IUserWallet, IWalletInfo } from '@/models/user'
import { CommonPagination } from '../models'
import axiosClient from './axiosClient'

const BASES_URL = '/users'

export const userApi = {
	topupMoney(params: IUserWallet) {
		return axiosClient.post<IResUserWallet>(`${BASES_URL}/wallet-connect`, params)
	},

	withDrawMoney(params: IUserWallet) {
		return axiosClient.post<IResUserWallet>(`${BASES_URL}/wallet-withdraw`, params)
	},

	getWalletInfo() {
		return axiosClient.get<IWalletInfo>(`${BASES_URL}/me/wallet`)
	},

	getWalletTransaction() {
		return axiosClient.get<CommonPagination<ITransaction[]>>(`${BASES_URL}/me/transaction-history`)
	},

	getAllNotifications() {
		return axiosClient.get<CommonPagination<INotification[]>>(`${BASES_URL}/notifications`)
	},

	getAllRequest() {
		return axiosClient.get<IRequest[]>(`${BASES_URL}/requests`)
	},

	doCancelContract(contractId: string) {
		return axiosClient.post(`${BASES_URL}/contract/${contractId}/cancel-by-renter`, {})
	},

	doRequestExtendContract({ contractId, newPeriod }: { newPeriod: string | number; contractId: string }) {
		return axiosClient.post(`${BASES_URL}/contract/${contractId}/extend-by-renter`, { newPeriod })
	},

	doCancelContractByLesser(contractId: string) {
		return axiosClient.post(`${BASES_URL}/contract/${contractId}/cancel-by-lessor`, {})
	},

	getDetailContract(roomId: string) {
		return axiosClient.get<IResContract>(`${BASES_URL}/contract/${roomId}`)
	},

	updateRoom(roomId: string) {
		return axiosClient.put(`${BASES_URL}/${roomId}`)
	},

	checkNotification(notificationId: string) {
		return axiosClient.put(`${BASES_URL}/notifications/${notificationId}`)
	},

	doAcceptCancelRent(requestId: string) {
		return axiosClient.post(`${BASES_URL}/contract/accept/${requestId}`)
	},

	getInvoices() {
		return axiosClient.get<CommonPagination<IInvoiceItem[]>>(`${BASES_URL}/invoices/rented`)
	},

	postReport({ roomId, content }: { roomId: string; content: string }) {
		return axiosClient.post(`${BASES_URL}/room/${roomId}/report`, { content })
	},

	postFeedback({ roomId, content, rating }: { roomId: string; content: string; rating: number | string }) {
		return axiosClient.post(`${BASES_URL}/room/${roomId}/feedback`, { content, rating })
	},

	doExtendRoomContact(requestId: string) {
		return axiosClient.post(`${BASES_URL}/contract/accept-extend/${requestId}`)
	},
}
