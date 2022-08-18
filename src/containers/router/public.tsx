import React from 'react';
import { Outlet, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import { AuthPage } from 'containers/pages/auth';
import { HomePage } from 'containers/pages/home/home';
import { Blogs } from 'containers/pages/home/blog/blogs';
import { BlogPost } from 'containers/pages/home/blog/blog-post';
import { BlogDetail } from 'containers/pages/home/blog/blog-detail';
import { BlogEdit } from 'containers/pages/home/blog/blog-edit';
import { SupportPage } from 'containers/pages/home/support';
import { TutorialPage } from 'containers/pages/home/tutorial';
import { DemoPage } from 'containers/pages/home/demo';
import { PublicLayout } from 'containers/layout/public';
import { SigninPage } from 'containers/pages/auth/signin';
import { SignupPage } from 'containers/pages/auth/signup';
import { ForgotPasswordPage } from 'containers/pages/auth/forgot-pwd';
import { ResetPasswordPage } from 'containers/pages/auth/reset-pwd';
import { ConfirmEmailPage } from 'containers/pages/auth/confirm-mail';

export const PublicRoutes = {
  path: '/',
  element: <PublicLayout />,
  children: [
    {
      path: '/',
      element: <Box component='div' className='home'><Outlet /></Box>,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/blogs',
          element: <Outlet />,
          children: [
            {
              path: '/blogs',
              element: <Blogs />
            },
            {
              path: '/blogs/create',
              element: <BlogPost />
            },
            {
              path: '/blogs/:blogId',
              element: <BlogDetail />
            },
            {
              path: '/blogs/:blogId/edit',
              element: <BlogEdit />
            },
          ]
        },
        {
          path: '/about',
          element: <SupportPage />
        },
        {
          path: '/tutorial',
          element: <TutorialPage />
        },
        {
          path: '/demo',
          element: <DemoPage />
        }
      ]
    },
    {
      path: '/auth',
      element: <Outlet />,
      children: [
        {
          path: '/auth/signin',
          element: <SigninPage />
        },
        {
          path: '/auth/signup',
          element: <SignupPage />
        },
        {
          path: '/auth/forgotpass',
          element: <ForgotPasswordPage />
        },
        {
          path: '/auth/resetpass',
          element: <ResetPasswordPage />
        },
        {
          path: '/auth/confirm',
          element: <ConfirmEmailPage />
        },
      ]
    }
  ]
}
