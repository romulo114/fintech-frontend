import React, { Dispatch, useReducer } from 'react'
import { Switch, Route } from 'react-router-dom'
import { NoSsr } from '@mui/material'

import { initialState, AppStateContext, reducer } from 'contexts/app'
import { ActionType } from 'contexts/context'

import { ProtectedRoute } from './protected-route'
import { PrivatePages } from './private'
import { PublicPages } from './public'
import { Title } from 'components/title'


export const AppRouter: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState.state)
	return (
		<NoSsr>
			<AppStateContext.Provider 
				value={{ state, dispatch: dispatch as Dispatch<ActionType> }}
			>
				<Title />
				<Switch>
					<ProtectedRoute path='/user'>
						<PrivatePages />
					</ProtectedRoute>
					<Route path='/'>
						<PublicPages />
					</Route>
				</Switch>
			</AppStateContext.Provider>
		</NoSsr>
	)
}
