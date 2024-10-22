import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import LoginForm from './pages/LoginPage'
import SignUpForm from './pages/SignUpPage'
import './index.css'
import { createTheme , CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme({
	palette: {
		primary: {
			main: '#6FB7EE'
		},
		secondary: {
			main: '#31363F'
		},
		background: {
			default: '#222831'
		},
	},
	typography:{
		fontFamily:[
			'Lato',
		].join(','),
	    button: {
      		textTransform: 'none'
    	},	
	}
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginForm />
	},
	{
		path: '/signup',
		element: <SignUpForm />
	}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<ThemeProvider theme={theme}>
		<CssBaseline />
	<RouterProvider router={router} />
	</ThemeProvider>
  </StrictMode>,
)
