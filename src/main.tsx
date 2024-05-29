import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './app/store'
import './locale/i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<BrowserRouter>
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<App />
			</StyledEngineProvider>
		</BrowserRouter>
	</Provider>
)
