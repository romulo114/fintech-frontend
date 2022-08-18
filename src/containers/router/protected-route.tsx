import {
	RouteProps,
	Navigate,
	useLocation,
	Outlet
} from 'react-router-dom';
import { useAuthenticate } from 'hooks';

interface ProtectedRouteProps extends RouteProps {
	authUrl?: string;
	activateUrl?: string;
	profileUrl?: string;
}
export const ProtectedRoute = (props: ProtectedRouteProps) => {
	const {
		authUrl = '/auth/signin',
		activateUrl = '/user/activate',
		profileUrl = '/user/profile'
	} = props;
	const { user } = useAuthenticate();
	const { pathname } = useLocation();

	if (!user) {
		return <Navigate to={authUrl} state={{ referrer: pathname }} />;
	}

	if (!user.active) {
		if (pathname !== activateUrl) {
			return <Navigate to={activateUrl} state={{ referrer: pathname }} />;
		}
	} else {
		if (!user.firstName && pathname !== profileUrl) {
			return <Navigate to={profileUrl} state={{ referrer: pathname }} />;
		}
	}

	return <Outlet />;
}
