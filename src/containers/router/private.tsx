import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import { CssBaseline } from '@mui/material'

import { PrivateLayout } from 'containers/layout/private'

export const PrivatePages: React.FC = () => {

  const match = useRouteMatch()
  return (
    <PrivateLayout>
      <CssBaseline />
      <Switch>
        <Route path={`${match.url}/dashboard`}>
          This is a dashboard
        </Route>
        <Route path={`${match.url}/profile`}>
          This is a profile
        </Route>
      </Switch>
    </PrivateLayout>
  )
}
