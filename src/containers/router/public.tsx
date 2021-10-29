import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import { CssBaseline } from '@mui/material'

import { PublicLayout } from 'containers/layout/public'

export const PublicPages: React.FC = (props) => {

  const match = useRouteMatch()
  return (
    <PublicLayout>
      <CssBaseline />
      <Switch>
        <Route path={`${match.url}/`}>
          This is a dashboard
        </Route>
      </Switch>
    </PublicLayout>
  )
}
