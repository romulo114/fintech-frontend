import { useRoutes } from 'react-router-dom';
import { NoSsr } from '@mui/material';

import { AppProvider } from 'contexts/app';
import { AuthProvider } from 'contexts/auth';

import { Title } from 'components/shared/app-title';
import { PrivateRoutes } from './private';
import { PublicRoutes } from './public';
import { AppNotification } from 'components/shared/app-nofitication';
import { AppDialog } from 'components/shared/app-dialog';


export const AppRouter = () => (
	<NoSsr>
		<AppProvider>
			<AuthProvider>
				<Title />
				{useRoutes([PrivateRoutes, PublicRoutes])}

				<AppNotification />
				<AppDialog />
			</AuthProvider>
		</AppProvider>
	</NoSsr>
);
