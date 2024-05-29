import Header from '@/common/Header'
import { LayoutProps } from '@/models/common'
import { Box, styled } from '@mui/system'
import * as React from 'react'

const MainContent = styled(Box)({
	width: '80%',
	margin: '0 auto',
	minHeight: '92vh',
	maxWidth: '1500px',
	paddingTop: 20,
})

export function MainLayout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			<main style={{ background: '#fafafb' }}>
				<MainContent>{children}</MainContent>
			</main>
		</>
	)
}
