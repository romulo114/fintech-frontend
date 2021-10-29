import React from 'react'
import { 
	RouteProps,
	Redirect,
	RouteComponentProps,
	Route 
} from 'react-router-dom'
import { User } from 'types'

interface ProtectedRouteProps extends RouteProps {
	authUrl?: string
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {

	const { authUrl, children, component, path, ...others } = props
	const user: User | null = null
	if (!user) {
		<Redirect to={{
			pathname: authUrl,
			state: { referrer: props.path }
		}} />
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