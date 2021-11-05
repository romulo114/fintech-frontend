import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { NoSsr } from '@mui/material'

import { WithApp, WithAuth } from 'contexts/wrappers'

import { ProtectedRoute } from './protected-route'
import { PrivatePages } from './private'
import { PublicPages } from './public'
import { Title } from 'components/title'


export const AppRouter: React.FC = () => {
	return (
		<NoSsr>
			<WithApp>
				<WithAuth>
					<Title />
					<Switch>
						<ProtectedRoute path='/user'>
							<PrivatePages />
						</ProtectedRoute>
						<Route path='/'>
							<PublicPages />
						</Route>
					</Switch>
				</WithAuth>
			</WithApp>
		</NoSsr>
	)
}
