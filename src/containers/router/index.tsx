import React from 'react';
import { Route, Routes, useRoutes } from 'react-router-dom';
import { NoSsr } from '@mui/material';

import { AppProvider, AuthProvider } from 'contexts';

import { ProtectedRoute } from './protected-route';
import { PublicLayout } from 'containers/layout/public';
import { Title } from 'components/title';
import { PrivateRoutes } from './private';
import { PublicRoutes } from './public';


// export const AppRouter: React.FC = () => {
// 	return (
// 		<NoSsr>
// 			<AppProvider>
// 				<AuthProvider>
// 					<Title />
// 					<Routes>
// 						<Route path='/user' element={<ProtectedRoute />}>
// 							<PrivatePages />
// 						</Route>
// 						<Route path='/' element={<PublicLayout />}>
// 							<PublicPages />
// 						</Route>
// 					</Routes>
// 				</AuthProvider>
// 			</AppProvider>
// 		</NoSsr>
// 	)
// }

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
