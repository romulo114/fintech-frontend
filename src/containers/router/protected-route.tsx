import React from 'react'
import {
	RouteProps,
	Redirect,
	RouteComponentProps,
	Route,
	useLocation
} from 'react-router-dom'
import { useAuthenticate } from 'hooks'

interface ProtectedRouteProps extends RouteProps {
	authUrl?: string;
	activateUrl?: string;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {

	const { authUrl, activateUrl, children, component, location, ...others } = props
	const { user } = useAuthenticate()
	const { pathname } = useLocation()

	if (!user) {
		return (
			<Redirect
				to={{
					pathname: authUrl,
					state: { referrer: location?.pathname }
				}}
			/>
		)
	}

	if (!user.active && pathname !== activateUrl) {
		return (
			<Redirect
				to={{
					pathname: activateUrl,
					state: { referrer: location?.pathname }
				}}
			/>
		)
	}

	const Component = component as React.ComponentClass<RouteComponentProps>
	if (Component) {
		return <Route {...others} component={Component} />
	} else {
		return (
			<Route {...others}>
				{children}
			</Route>
		)
	}
}

ProtectedRoute.defaultProps = {
	authUrl: '/auth/signin',
	activateUrl: '/user/activate'
}
