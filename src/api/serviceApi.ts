import { IServiceDemand, IServiceRes } from '@/models/services'
import { IUpdateServiceParams } from './../models/services'
import axiosClient from './axiosClient'

const BASES_URL = '/service'

export const serviceApi = {
	getListServiceDemand(roomId: string) {
		return axiosClient.get<IServiceRes[]>(`${BASES_URL}/${roomId}/service-demand`)
	},

	updateServiceDemand(params: IUpdateServiceParams) {
		return axiosClient.put<IServiceDemand>(`${BASES_URL}/service-demand`, params)
	},
}
