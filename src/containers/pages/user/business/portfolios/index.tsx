import React from 'react'
import { Route } from 'react-router-dom'

import { PortfolioCreate } from './portfolio-create'
import { PortfoliosPage } from './portfolios'
import { PortfolioUpdate } from './portfolio-update'

export const Portfolios: React.FC = () => (
  <>
    <Route path='/user/business/portfolios'>
      <PortfoliosPage />
    </Route>
    <Route path='/user/business/portfolios/create'>
      <PortfolioCreate />
    </Route>
    <Route path='/user/business/portfolios/:portfolioId'>
      <PortfolioUpdate />
    </Route>
  </>
);
