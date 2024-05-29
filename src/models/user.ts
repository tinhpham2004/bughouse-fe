export interface IUserWallet {
	walletAddress: string
	amount: number
}

export interface IResUserWallet {
	paymentUrl: string
}

export interface IWalletInfo {
	walletPrivateKey: string
	walletAddress: string
	balance: number | string
}

export interface IOwnerInfo {
	avatar: string
	identity: string
	name: string
	phone: string
	username: string
	_id: string
}

export interface ITransaction {
	_id: string
	transactionId: string
	action: string
	data: null
	prevBalance: number
	actionAmount: number
	balance: number
	isReverted: boolean
	isDeleted: boolean
	createdAt: string
	updatedAt: string
	__v: number
}

export interface IUser {
	address: {
		city: string
		district: string
		ward: string
		street: string
	}
	_id: string
	username: string
	email: string
	phone: string
	identity: number | string
	name: string
	gender: string
	dob: string
	avatar: string
	notifications: []
	enable: boolean
	socketId: string
	wishList: []
	deleted: boolean
	wallet: IWalletInfo
	createdAt: string
	updatedAt: string
}
