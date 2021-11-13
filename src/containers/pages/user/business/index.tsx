import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { PrivateLayout } from 'containers/layout/private'

import { Dashboard } from './dashboard'
import { Accounts } from './accounts'
import { Trades } from './trades'
import { Strategies } from './strategies'
import { Portfolios } from './portfolios'
import { Documentation } from './documentation'

export const BusinessPages: React.FC = () => {

  const { path } = useRouteMatch()

  return (
    <PrivateLayout>
      <Switch>
        <Route path={`${path}/dashboard`}>
          <Dashboard />
        </Route>
        <Route path={`${path}/accounts`}>
          <Accounts />
        </Route>
        <Route path={`${path}/trades`}>
          <Trades />
        </Route>
        <Route path={`${path}/strategies`}>
          <Strategies />
        </Route>
        <Route path={`${path}/portfolios`}>
          <Portfolios />
        </Route>
        <Route path={`${path}/documentation`}>
          <Documentation />
        </Route>
      </Switch>
    </PrivateLayout>
  )
}
