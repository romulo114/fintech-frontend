import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { AccountsPage } from './accounts'
import { AccountUpdatePage } from './account-update'
import { AccountCreatePage } from './account-create'

export const Accounts: React.FC = () => {

  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <AccountsPage />
      </Route>
      <Route path={`${path}/create`}>
        <AccountCreatePage />
      </Route>
      <Route path={`${path}/:accountId`}>
        <AccountUpdatePage />
      </Route>
    </Switch>
  )
}
