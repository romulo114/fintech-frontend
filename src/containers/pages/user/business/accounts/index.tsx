import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { AccountsPage } from './accounts'
import { AccountSummaryPage } from './account-summary'
import { AccountDetailPage } from './account-detail'
import { AccountUpdatePage } from './account-update'
import { AccountCreatePage } from './account-create'

export const Accounts: React.FC = () => {

  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <AccountsPage />
      </Route>
      <Route path={`${path}/summary/:tradeId`}>
        <AccountSummaryPage />
      </Route>
      <Route path={`${path}/create`}>
        <AccountCreatePage />
      </Route>
      <Route path={`${path}/:accountId/edit`}>
        <AccountUpdatePage />
      </Route>
      <Route path={`${path}/:accountId`}>
        <AccountDetailPage />
      </Route>
    </Switch>
  )
}
