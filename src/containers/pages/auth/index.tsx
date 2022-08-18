import React from 'react'
import { Route } from 'react-router-dom'

import { SigninPage } from './signin'
import { SignupPage } from './signup'
import { ForgotPasswordPage } from './forgot-pwd'
import { ResetPasswordPage } from './reset-pwd'
import { ConfirmEmailPage } from './confirm-mail'

import './auth.scss'

export const AuthPage: React.FC = () => (
  <>
    <Route path='/auth/signin'>
      <SigninPage />
    </Route>
    <Route path='/auth/signup'>
      <SignupPage />
    </Route>
    <Route path='/auth/forgotpass'>
      <ForgotPasswordPage />
    </Route>
    <Route path='/auth/resetpass'>
      <ResetPasswordPage />
    </Route>
    <Route path='/auth/confirm'>
      <ConfirmEmailPage />
    </Route>
  </>
);
