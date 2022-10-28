import { useRoutes } from 'react-router-dom';
import { PrivateRoutes } from './private';
import { PublicRoutes } from './public';

export const AppRouter = () => (
	useRoutes([PrivateRoutes, PublicRoutes])
);
