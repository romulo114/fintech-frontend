import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { PublicLayout } from 'containers/layout/public'
import { ActivateUser } from './activate'
import { Profile } from './profile'

export const GeneralPages: React.FC = () => {

  const { path } = useRouteMatch()

  return (
    <PublicLayout>
      <Switch>
        <Route path={`${path}/activate`}>
          <ActivateUser />
        </Route>
        <Route path={`${path}/profile`}>
          <Profile />
        </Route>
      </Switch>
    </PublicLayout>
  )
}
