import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import { Box } from '@mui/material'

import { SigninPage } from './signin'
import { SignupPage } from './signup'
import { ForgotPasswordPage } from './forgot-pwd'
import { ResetPasswordPage } from './reset-pwd'
import { ConfirmEmailPage } from './confirm-mail'

export const AuthPage: React.FC = () => {

  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={`${path}/signin`}>
        <SigninPage />
      </Route>
      <Route path={`${path}/signup`}>
        <SignupPage />
      </Route>
      <Route path={`${path}/forgotpass`}>
        <ForgotPasswordPage />
      </Route>
      <Route path={`${path}/resetpass`}>
        <ResetPasswordPage />
      </Route>
      <Route path={`${path}/confirm`}>
        <ConfirmEmailPage />
      </Route>
    </Switch>
  )
}
