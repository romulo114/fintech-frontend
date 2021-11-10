import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { Box } from '@mui/material'

import { HomePage as Home } from './home'
import { BlogsPage } from './blog'
import { SupportPage } from './support'
import { TutorialPage } from './tutorial'

import './home.scss'

export const HomePage: React.FC = () => {
	const { path } = useRouteMatch()

  return (
		<Box component='div' className='home'>
			<Switch>
				<Route path={`${path}blogs`}>
					<BlogsPage />
				</Route>
				<Route path={`${path}support`}>
					<SupportPage />
				</Route>
				<Route path={`${path}tutorial`}>
					<TutorialPage />
				</Route>
				<Route exact path={`${path}`}>
					<Home />
				</Route>
			</Switch>
		</Box>
  )
}
