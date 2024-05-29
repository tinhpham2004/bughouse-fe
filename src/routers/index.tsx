import { HomeLayout } from '@/components/layout/HomeLayout'
import { ProfilePage } from 'pages/user'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { randomId } from '../utils'
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'
import RenderRouteHeader from './RenderRouteHeader'

const AuthenPage = React.lazy(() => import('pages/auth/AuthenPage'))
const ForgotPassPage = React.lazy(() => import('pages/auth/ForgotPassPage'))
const SignIn = React.lazy(() => import('pages/auth/SignIn'))
const SignUp = React.lazy(() => import('pages/auth/SignUp'))
const UpdateId = React.lazy(() => import('pages/auth/UpdateId'))
const Home = React.lazy(() => import('pages/Home'))
const PaymentPageHandle = React.lazy(() => import('pages/payment'))
const InvoicePage = React.lazy(() => import('pages/payment/InvoicePage'))
const RoomDetail = React.lazy(() => import('pages/room'))
const AddRoom = React.lazy(() => import('pages/room/AddRoom'))
const DeclareRoomPage = React.lazy(() => import('pages/room/DeclareRoomPage'))
const RoomsLocation = React.lazy(() => import('pages/room/RoomsLocation'))
const BookingPage = React.lazy(() => import('pages/user/BookingPage'))
const MyRoomPage = React.lazy(() => import('pages/user/MyRoomPage'))
const WalletPage = React.lazy(() => import('pages/user/WalletPage'))
const PageNotFound = React.lazy(() => import('pages/notFoundPage'))

const mainRoutes = [
	{
		id: 2,
		element: <ProfilePage />,
		pathName: '/profile/:id',
	},
	{
		id: 3,
		element: <BookingPage />,
		pathName: '/room/rented',
	},
	{
		id: 4,
		element: <WalletPage />,
		pathName: '/MyWallet',
	},
	{
		id: 6,
		element: <MyRoomPage />,
		pathName: '/room/myRooms',
	},
	{
		id: 7,
		element: <PaymentPageHandle />,
		pathName: '/bh/payment-confirmation',
	},
	{
		id: 8,
		element: <DeclareRoomPage />,
		pathName: '/room/myRooms/:idRoom',
	},
	{
		id: 9,
		element: <InvoicePage />,
		pathName: '/invoices',
	},
]

const RoutesHomeLayout = [
	{
		id: 1,
		element: <Home />,
		pathName: '/',
	},
	{
		id: 2,
		element: <RoomDetail />,
		pathName: '/room/:roomid',
	},
	{
		id: 3,
		element: <RoomsLocation />,
		pathName: '/search/:location',
	},
	{
		id: 4,
		element: <AddRoom />,
		pathName: '/room/addRoom',
	},
	{
		id: 5,
		element: <AddRoom />,
		pathName: '/room/addRoom/:id',
	},
]

const AdminRoutesLayout = [
	{
		id: 1,
		element: 'Admin Page',
		pathName: '/',
	},
]

const AuthRoutes = [
	{
		element: <SignIn />,
		pathName: '/login',
	},
	{
		element: <SignUp />,
		pathName: '/register',
	},
	{
		element: <AuthenPage />,
		pathName: '/authOtp',
	},
	{
		element: <ForgotPassPage />,
		pathName: '/forgot-password',
	},
	{
		element: <UpdateId />,
		pathName: '/registerAuth',
	},
]

const PathRouter = () => {
	return (
		<Routes>
			{/* Normal Route */}
			<Route element={<RenderRouteHeader />}>
				{mainRoutes.map((item) => (
					<Route path={item.pathName} key={item.id} element={<PrivateRoute>{item.element}</PrivateRoute>} />
				))}
				<Route path="*" element={<PageNotFound />} />
			</Route>

			{/* Logined Router */}
			{RoutesHomeLayout.map((item) => (
				<Route path={item.pathName} key={item.id} element={<HomeLayout>{item.element}</HomeLayout>} />
			))}

			{/* Admin Router */}
			{AdminRoutesLayout.map((route) => (
				<Route
					path={`/admin${route.pathName}`}
					key={route.id}
					element={<AdminRoute>{route.element}</AdminRoute>}
				/>
			))}

			{AuthRoutes.map((route) => (
				<Route path={route.pathName} key={randomId()} element={route.element} />
			))}
		</Routes>
	)
}

export default PathRouter
