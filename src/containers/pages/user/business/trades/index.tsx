import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { TradeList } from './trades'

export const Trades: React.FC = () => {

  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <TradeList />
      </Route>
    </Switch>
  )
}
