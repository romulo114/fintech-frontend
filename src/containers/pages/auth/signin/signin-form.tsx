import React, { MouseEvent, MouseEventHandler, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Box, Button, Link, LinearProgress } from '@mui/material'
import { ValidatedInput } from 'components/form'
import { DASHBOARD_URL } from 'types/user'
import { ValidatedText } from 'types/validate'
import { emailValidators, passValidators } from 'utils/validators'
import { useAuthenticate } from 'hooks/auth'
import { Message, MessageType } from 'components/base'


export const SigninForm: React.FC = () => {

  const [email, setEmail] = useState<ValidatedText>({ value: '', error: '' })
  const [password, setPassword] = useState<ValidatedText>({ value: '', error: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  
  const { user, signin } = useAuthenticate()
  const [redir, setRedir] = useState(() => user ? DASHBOARD_URL : '')
  const location = useLocation();
  const state: any = location.state;

  const handleSignin: MouseEventHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      setBusy(true)
      setError({})

      await signin(email.value, password.value)

      setError({ type: 'success', message: 'Redirecting ...' })
      setTimeout(() => setRedir(state?.referrer ?? DASHBOARD_URL), 1000)
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }

  if (redir) {
    return <Navigate to={redir} />
  }

  return (
    <form className='auth-form'>
      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}
      <ValidatedInput
        fullWidth
        type='email'
        id="signin-email"
        label="Email Address"
        variant="standard"
        className='input'
        validators={emailValidators}
        value={email}
        setValue={setEmail}
      />
      <ValidatedInput
        fullWidth
        type='password'
        id="signin-password"
        label="Password"
        variant="standard"
        className='input'
        validators={passValidators}
        value={password}
        setValue={setPassword}
      />

      <Box component='div' className='actions'>
        <Button onClick={handleSignin} fullWidth variant='contained' type='submit'>
          Sign in
        </Button>
      </Box>
      <Box component='div' className='links'>
        <Link href='/auth/forgotpass' variant='button'>
          Forgot Password
        </Link>
        <Link href='/auth/signup' variant='button'>
          Sign Up
        </Link>
      </Box>
    </form>
  )
}
