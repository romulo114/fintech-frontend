import React, { useState, useCallback, ChangeEvent, ChangeEventHandler } from 'react'
import { TextField, Box, Button, Link, LinearProgress } from '@mui/material'
import { ValidatedText } from 'types/validate'
import {
  validate,
  isRequired,
  validateMinLen,
  isValidEmail,
  isNumber,
  isPasswordMatched
} from 'utils/validators'

export const SignupForm: React.FC = () => {

  const [username, setUsername] = useState<ValidatedText>({ value: '', error: '' })
  const [email, setEmail] = useState<ValidatedText>({ value: '', error: '' })
  const [password, setPassword] = useState<ValidatedText>({ value: '', error: '' })
  const [confirm, setConfirm] = useState<ValidatedText>({ value: '', error: '' })
  const [busy, setBusy] = useState(false)

  const signup: () => Promise<void> = async () => {

  }

  const usernameChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const error = await validate(e.target.value, [
        { fn: isRequired, error: 'Username is required' },
        { fn: validateMinLen(3), error: 'Username must be at least 3 of length' }
      ])
      setUsername({ value: e.target.value, error })
    }, []
  )

  const emailChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const error = await validate(e.target.value, [
        { fn: isRequired, error: 'Email is required' },
        { fn: isValidEmail, error: 'Invalid email address' }
      ])
      setEmail({ value: e.target.value, error })
    }, []
  )

  const passwordChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const error = await validate(e.target.value, [
        { fn: isRequired, error: 'Password is required' },
        { fn: validateMinLen(6), error: 'Password must be at least 6 of length' }
      ])
      setPassword({ value: e.target.value, error })
    }, []
  )

  const confirmChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const error = await validate(e.target.value, [
        { fn: isPasswordMatched(password.value), error: 'Password mismatch' }
      ])
      setConfirm({ value: e.target.value, error })
    }, [password.value]
  )

  return (
    <form className='auth-form'>
      {busy && <LinearProgress />}
      <TextField
        fullWidth
        id="username"
        label="Username"
        variant="standard"
        value={username.value}
        onChange={usernameChange}
        helperText={username.error}
        className='input'
      />
      <TextField
        fullWidth
        id="email"
        label="Email Address"
        variant="standard"
        value={email.value}
        onChange={emailChange}
        helperText={email.error}
        className='input'
      />
      <TextField
        fullWidth
        id="password"
        label="Password"
        variant="standard"
        value={password.value}
        onChange={passwordChange}
        helperText={password.error}
        className='input'
      />
      <TextField
        fullWidth
        id="confirm-password"
        label="Confirm Password"
        variant="standard"
        value={confirm.value}
        onChange={confirmChange}
        helperText={confirm.error}
        className='input'
      />

      <Box component='div' className='actions'>
        <Button onClick={signup} fullWidth variant='contained'>
          Sign in
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
