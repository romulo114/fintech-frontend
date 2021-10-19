import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import { CssBaseline } from '@material-ui/core'

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
      </Switch>
    </PrivateLayout>
  )
}
