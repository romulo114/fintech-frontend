import React from 'react'
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom'

import { ActivateUser } from './activate'
import { Dashboard } from './dashboard'


export const UserPage: React.FC = () => {

  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/activate`}>
        <ActivateUser />
      </Route>
      <Route path={`${path}/dashboard`}>
        <Dashboard />
      </Route>
      <Redirect to={`${path}/dashboard`} />
    </Switch>
  )
}
