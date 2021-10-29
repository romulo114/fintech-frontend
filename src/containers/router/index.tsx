import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import { NoSsr } from '@mui/material'

import { ProtectedRoute } from './protected-route'
import { PrivatePages } from './private'
import { PublicPages } from './public'

export const AppRouter: React.FC = () => {
	return (
		<NoSsr>
			<Switch>
				<ProtectedRoute path='/user'>
					<PrivatePages />
				</ProtectedRoute>
				<Route path='/'>
					<PublicPages />
				</Route>
			</Switch>
		</NoSsr>
	)
}
