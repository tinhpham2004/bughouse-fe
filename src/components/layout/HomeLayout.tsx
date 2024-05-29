import Header from '@/common/Header'
import { LayoutProps } from '@/models/common'
import { Box, styled } from '@mui/system'
import PrivateRoute from 'routers/PrivateRoute'

export function HomeLayout({ children }: LayoutProps) {
	return (
		<PrivateRoute>
			<Header />
			<main style={{ background: '#fafafb' }}>{children}</main>
		</PrivateRoute>
	)
}
