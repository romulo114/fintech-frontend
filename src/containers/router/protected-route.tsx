import React from 'react'
import {
	RouteProps,
	Redirect,
	RouteComponentProps,
	Route
} from 'react-router-dom'
import { useAuthenticate } from 'hooks'

interface ProtectedRouteProps extends RouteProps {
	authUrl?: string
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {

	const { authUrl, children, component, location, ...others } = props
	const { user } = useAuthenticate()

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
	authUrl: '/auth/signin'
}
