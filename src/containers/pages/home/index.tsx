import React from 'react'
import { Route } from 'react-router-dom'
import { Box } from '@mui/material'

import { HomePage as Home } from './home'
import { BlogsPage } from './blog'
import { SupportPage } from './support'
import { TutorialPage } from './tutorial'
import { DemoPage } from './demo'

import './home.scss'

export const HomePage: React.FC = () => (
	<Box component='div' className='home'>
		<Route path='/blogs'>
			<BlogsPage />
		</Route>
		<Route path='/about'>
			<SupportPage />
		</Route>
		<Route path='/tutorial'>
			<TutorialPage />
		</Route>
		<Route path='/demo'>
			<DemoPage />
		</Route>
		<Route path='/'>
			<Home />
		</Route>
	</Box>
);
