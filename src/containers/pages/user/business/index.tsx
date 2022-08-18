import React from 'react'
import { Route } from 'react-router-dom'
import { PrivateLayout } from 'containers/layout/private'

import { Dashboard } from './dashboard'
import { Accounts } from './accounts'
import { Trades } from './trades'
import { Strategies } from './strategies'
import { Portfolios } from './portfolios'
import { Documentation } from './documentation'
import { BusinessPaper } from 'components/user/business-paper'

export const BusinessPages: React.FC = () => (
    <>
      <Route path='/user/busniess/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/user/busniess/accounts'>
        <Accounts />
      </Route>
      <Route path='/user/busniess/portfolios'>
        <Portfolios />
      </Route>
      <Route path='/user/busniess/trades'>
        <Trades />
      </Route>
      <Route path='/user/busniess/strategies'>
        <Strategies />
      </Route>
      <Route path='/user/busniess/documentation'>
        <Documentation />
      </Route>
    </>
  );
