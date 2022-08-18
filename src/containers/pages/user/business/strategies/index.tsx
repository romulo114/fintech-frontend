import React from 'react'
import { Route } from 'react-router-dom'

import { StrategyList } from './strategies'
import { StrategyCreate } from './strategy-create'
import { StrategyUpdate } from './strategy-update'

export const Strategies: React.FC = () => (
    <>
      <Route path='/user/business/strategies'>
        <StrategyList />
      </Route>
      <Route path='/user/business/strategies/create'>
        <StrategyCreate />
      </Route>
      <Route path='/user/business/strategies/:strategyId'>
        <StrategyUpdate />
      </Route>
    </>
  );
