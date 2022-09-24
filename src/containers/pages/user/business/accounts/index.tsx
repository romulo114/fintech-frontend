import React from 'react'
import { Route } from 'react-router-dom'

import { AccountsPage } from './accounts'
import { AccountUpdatePage } from './account-update'
import { AccountCreatePage } from './account-create'

export const Accounts: React.FC = () => (
  <>
    <Route path='/user/business/accounts'>
      <AccountsPage />
    </Route>
    <Route path='/user/business/accounts/create'>
      <AccountCreatePage />
    </Route>
    <Route path='/user/business/accounts/:accountId'>
      <AccountUpdatePage />
    </Route>
  </>
);
