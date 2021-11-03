import React, { useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { Box, Button, Link, LinearProgress } from '@mui/material'
import { ValidatedInput } from 'components/form'
import { ValidatedText } from 'types/validate'
import { emailValidators, passValidators } from 'utils/validators'
import { useAuthenticate } from 'hooks/auth'
import { Message, MessageType } from 'components/base'


export const SigninForm: React.FC = () => {

  const [email, setEmail] = useState<ValidatedText>({ value: '', error: '' })
  const [password, setPassword] = useState<ValidatedText>({ value: '', error: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [redir, setRedir] = useState('')

  const { signin } = useAuthenticate()
  const location = useLocation<{ referrer?: string }>()

  const handleSignin: () => Promise<void> = async () => {
    try {
      setBusy(true)
      setError({})

      await signin(email.value, password.value)

      setError({ type: 'success', message: 'Redirecting ...' })
      setTimeout(() => setRedir(location.state.referrer ?? '/user/dashboard'), 1000)
    } catch (e: any) {
      setError({ type: 'error', message: e.response?.data?.message })
    } finally {
      setBusy(false)
    }
  }

  if (redir) {
    return <Redirect to={redir} />
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
        <Button onClick={handleSignin} fullWidth variant='contained'>
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
