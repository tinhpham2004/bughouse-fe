import { IUser } from './user'

export interface INotification {
	_id: string
	userOwner: IUser
	type: string
	isChecked: boolean
	content: string
	createdAt: string
	updatedAt: string
}
