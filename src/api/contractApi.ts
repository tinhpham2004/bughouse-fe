import { IContract, IResContract, ISignContract } from './../models/contract'
import axiosClient from './axiosClient'

const BASES_URL = '/contract'

export const contractApi = {
	createContract(params: IContract) {
		return axiosClient.post<IResContract>(`${BASES_URL}/create-contract`, params)
	},

	signContract(params: ISignContract) {
		return axiosClient.post(`${BASES_URL}/sign-by-renter`, params)
	},
}
