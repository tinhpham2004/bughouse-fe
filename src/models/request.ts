export interface IRequest {
	requestId: string
	roomId: string
	type: 'CANCEL_RENTAL' | 'CONTINUE_RENTAL'
}
