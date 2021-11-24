import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { StrategyList } from './strategies'
import { StrategyCreate } from './strategy-create'
import { StrategyUpdate } from './strategy-update'

export const Strategies: React.FC = () => {

  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <StrategyList />
      </Route>
      <Route path={`${path}/create`}>
        <StrategyCreate />
      </Route>
      <Route path={`${path}/:strategyId`}>
        <StrategyUpdate />
      </Route>
    </Switch>
  )
}
