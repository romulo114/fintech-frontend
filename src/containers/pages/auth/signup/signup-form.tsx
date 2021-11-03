import React, { useState } from 'react'
import { Box, Button, Link, LinearProgress } from '@mui/material'
import { ValidatedInput } from 'components/form'
import { ValidatedText } from 'types/validate'
import {
  nameValidators,
  emailValidators,
  passValidators,
  confirmValidators
} from 'utils/validators'

export const SignupForm: React.FC = () => {

  const [username, setUsername] = useState<ValidatedText>({ value: '', error: '' })
  const [email, setEmail] = useState<ValidatedText>({ value: '', error: '' })
  const [password, setPassword] = useState<ValidatedText>({ value: '', error: '' })
  const [confirm, setConfirm] = useState<ValidatedText>({ value: '', error: '' })
  const [busy, setBusy] = useState(false)

  const signup: () => Promise<void> = async () => {

  }

  return (
    <form className='auth-form'>
      {busy && <LinearProgress />}
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
        <Button onClick={signup} fullWidth variant='contained'>
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
