import React from 'react'
import { Route } from 'react-router-dom'
import { Blogs } from './blogs'
import { BlogPost } from './blog-post'
import { BlogDetail } from './blog-detail'
import { BlogEdit } from './blog-edit'

export const BlogsPage: React.FC = () => (
		<>
			<Route path='/blogs/create'>
				<BlogPost />
			</Route>
			<Route path='/blogs/:blogId'>
				<BlogDetail />
			</Route>
			<Route path='/blogs/:blogId/edit'>
				<BlogEdit />
			</Route>
			<Route path='/blogs'>
				<Blogs />
			</Route>
		</>
	);
