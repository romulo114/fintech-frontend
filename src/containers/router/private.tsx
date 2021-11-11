import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { GeneralPages, BusinessPages } from 'containers/pages/user'

export const PrivatePages: React.FC = () => {

  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/business`}>
        <BusinessPages />
      </Route>
      <Route path={`${path}`}>
        <GeneralPages />
      </Route>
    </Switch>
  )
}
