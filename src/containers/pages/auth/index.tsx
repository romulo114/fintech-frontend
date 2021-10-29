import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router'
import { Box } from '@mui/material'

import { SigninPage } from './signin'
import { SignupPage } from './signup'
import { ForgotPasswordPage } from './forgot-pwd'
import { ResetPasswordPage } from './reset-pwd'
import { ConfirmEmailPage } from './confirm-mail'

export const AuthPage = () => {

  const match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.url}/signin`}>
        <SigninPage />
      </Route>
      <Route path={`${match.url}/signup`}>
        <SignupPage />
      </Route>
      <Route path={`${match.url}/forgotpass`}>
        <ForgotPasswordPage />
      </Route>
      <Route path={`${match.url}/resetpass`}>
        <ResetPasswordPage />
      </Route>
      <Route path={`${match.url}/confirm`}>
        <ConfirmEmailPage />
      </Route>
    </Switch>
  )
}
