import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { Box } from '@mui/material'

import { Blogs } from './blogs'
import { BlogPost } from './blog-post'
import { BlogDetail } from './blog-detail'
import { BlogEdit } from './blog-edit'

export const BlogsPage: React.FC = () => {

  const { path } = useRouteMatch()
  return (
    <Box component='div' className='home'>
			<Switch>
				<Route path={`${path}/create`}>
					<BlogPost />
				</Route>
				<Route exact path={`${path}/:blogId`}>
					<BlogDetail />
				</Route>
				<Route path={`${path}/:blogId/edit`}>
					<BlogEdit />
				</Route>
				<Route exact path={`${path}`}>
					<Blogs />
				</Route>
			</Switch>
		</Box>
  )
}
