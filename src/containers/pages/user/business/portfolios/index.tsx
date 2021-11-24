import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import { PortfolioCreate } from './portfolio-create'
import { PortfoliosPage } from './portfolios'
import { PortfolioUpdate } from './portfolio-update'

export const Portfolios: React.FC = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <PortfoliosPage />
      </Route>
      <Route path={`${path}/create`}>
        <PortfolioCreate />
      </Route>
      <Route path={`${path}/:portfolioId`}>
        <PortfolioUpdate />
      </Route>
    </Switch>
  )
}
