import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

import { PublicLayout } from 'containers/layout/public'
import { AuthPage } from 'containers/pages/auth'
import { HomePage } from 'containers/pages/home'

export const PublicPages: React.FC = () => {

  const { path } = useRouteMatch()
  return (
    <PublicLayout>
      <CssBaseline />
      <Switch>
        <Route path={`${path}auth`}>
          <AuthPage />
        </Route>
        <Route path={`${path}`}>
          <HomePage />
        </Route>
      </Switch>
    </PublicLayout>
  )
}
