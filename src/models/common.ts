import { ReactElement, ReactNode } from 'react'

export interface PaginationParams {
	page: number
	size: number
	totalItem: number
	totalPage: number
}

export interface ListResponse<T> extends PaginationParams {
	items: T[]
}

export interface ResponseObject<T> {
	data: T
	errorCode: number
	message: string
}
export interface LayoutProps {
	children: ReactNode
}

export interface CommonPagination<T> {
	total: number
	page: number
	limit: number
	totalPages: number
	items: T
}
