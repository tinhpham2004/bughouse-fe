import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }: { children: any }) => {
	// Get Authenticated here
	const isAuthenticated = true

	return isAuthenticated ? children : <Navigate to="/" />
}

export default AdminRoute
