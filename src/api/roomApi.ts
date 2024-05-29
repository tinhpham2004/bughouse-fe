import {
	IParamsGetRoom,
	IReOpenRoom,
	IResponseLessed,
	IResponseRented,
	IRoomFeedback,
	IRoomParams,
	room,
} from '@/models/room'
import { CommonPagination } from './../models/common'

import axiosClient from './axiosClient'
const BASES_URL = '/room'

export const roomApi = {
	createRoom(params: IRoomParams) {
		return axiosClient.post(`${BASES_URL}/create-room`, params)
	},

	getAllRoom(params: IParamsGetRoom) {
		return axiosClient.get<CommonPagination<IResponseLessed[]>>(`${BASES_URL}`, { params: params })
	},

	getDetailRoom(roomId: string) {
		return axiosClient.get<room>(`${BASES_URL}/${roomId}`)
	},

	getRoomrented() {
		return axiosClient.get<CommonPagination<IResponseRented[]>>(`${BASES_URL}/user/rented`)
	},

	getRoomForRent() {
		return axiosClient.get<CommonPagination<IResponseLessed[]>>(`${BASES_URL}/user/leased`)
	},

	doReOpenRoom(params: IReOpenRoom) {
		return axiosClient.post(`${BASES_URL}/re-open/${params.roomId}`, params)
	},

	getRoomFeedback(roomId: string) {
		return axiosClient.get<CommonPagination<IRoomFeedback[]>>(`${BASES_URL}/${roomId}/feedback`)
	},

	addFeedback(params: { roomId: string; content: string }) {
		return axiosClient.post(`${BASES_URL}/${params.roomId}/feedback`, { content: params.content })
	},
}
