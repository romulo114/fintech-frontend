import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import NoSsr from '@material-ui/core/NoSsr'

import { Home } from 'containers/pages/home'

export const AppRouter: React.FC = () => {
	return (
		<NoSsr>
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Redirect to={'/'} />
			</Switch>
		</NoSsr>
	)
}
