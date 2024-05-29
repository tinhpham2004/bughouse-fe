import { MainLayout } from '@/components/layout/MainLayout'
import { Outlet } from 'react-router-dom'

const RenderRouteHeader = () => {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	)
}

export default RenderRouteHeader
