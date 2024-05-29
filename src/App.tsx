import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PathRouter from 'routers'
import 'sweetalert2/src/sweetalert2.scss'
import './app.css'
import LoadingFallBack from './components/common/LoadingFallback'

// Create a client
const queryClient = new QueryClient()

const theme = createTheme({
	typography: {
		fontFamily: [
			'Nunito',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
})

function App() {
	return (
		<Suspense fallback={<LoadingFallBack />}>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<PathRouter />
					<ToastContainer />
				</QueryClientProvider>
			</ThemeProvider>
		</Suspense>
	)
}

export default App
