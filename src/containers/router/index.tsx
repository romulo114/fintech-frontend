import { useRoutes } from 'react-router-dom';
import { NoSsr } from '@mui/material';

import { AppProvider } from 'contexts/app';
import { AuthProvider } from 'contexts/auth';

import { Title } from 'components/title';
import { PrivateRoutes } from './private';
import { PublicRoutes } from './public';


export const AppRouter = () => (
	<NoSsr>
		<AppProvider>
			<AuthProvider>
				<Title />
				{useRoutes([PrivateRoutes, PublicRoutes])}
			</AuthProvider>
		</AppProvider>
	</NoSsr>
);
