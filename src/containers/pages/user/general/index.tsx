import React from 'react'
import { Route } from 'react-router-dom'
import { ActivateUser } from './activate'
import { Profile } from './profile'

export const GeneralPages: React.FC = () => (
  <>
    <Route path='/user/activate'>
      <ActivateUser />
    </Route>
    <Route path='/user/profile'>
      <Profile />
    </Route>
  </>
);
