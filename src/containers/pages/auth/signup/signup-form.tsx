import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button, Link, LinearProgress } from '@mui/material'
import { ValidatedInput } from 'components/form'
import { ValidatedText } from 'types/validate'
import {
  nameValidators,
  emailValidators,
  passValidators,
  confirmValidators
} from 'utils/validators'
import { useAuthenticate } from 'hooks/auth'
import { Message } from 'components/base'

export const SignupForm: React.FC = () => {

  const [username, setUsername] = useState<ValidatedText>({ value: '', error: '' })
  const [email, setEmail] = useState<ValidatedText>({ value: '', error: '' })
  const [password, setPassword] = useState<ValidatedText>({ value: '', error: '' })
  const [confirm, setConfirm] = useState<ValidatedText>({ value: '', error: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const history = useHistory()

  const { signup } = useAuthenticate()

  const handleSignup: () => Promise<void> = async () => {
    try {
      setBusy(true)
      setError('')
      await signup(email.value, username.value, password.value)
      history.replace('/user')
    } catch (e: any) {
      setError(e.response?.data?.message)
    } finally {
      setBusy(false)
    }
  }

  const enabled = !!username.value && !!email.value && !!password.value && !!confirm.value && 
    !username.error && !email.error && !password.error && !confirm.error
  return (
    <form className='auth-form'>
      {busy && <LinearProgress />}
      {error && <Message type='error'>{error}</Message>}
      <ValidatedInput
        fullWidth
        id='username'
        label='Username'
        variant='standard'
        className='input'
        validators={nameValidators}
        value={username}
        setValue={setUsername}
      />
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
      <ValidatedInput
        fullWidth
        type='password'
        id='confirm-password'
        label='Confirm Password'
        variant='standard'
        className='input'
        validators={confirmValidators(password.value)}
        value={confirm}
        setValue={setConfirm}
      />

      <Box component='div' className='actions'>
        <Button onClick={handleSignup} fullWidth variant='contained' disabled={!enabled}>
          Sign up
        </Button>
      </Box>
      <Box component='div' className='links'>
        <Link href='/' variant='button'>
          Home
        </Link>
        <Link href='/auth/signin' variant='button'>
          Sign In
        </Link>
      </Box>
    </form>
  )
}
