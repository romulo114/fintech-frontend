import React, { useState } from 'react'
import { Box, Button, Link, LinearProgress } from '@mui/material'
import { ValidatedInput } from 'components/form'
import { ValidatedText } from 'types/validate'
import { emailValidators, passValidators } from 'utils/validators'


export const SigninForm: React.FC = () => {

  const [email, setEmail] = useState<ValidatedText>({ value: '', error: '' })
  const [password, setPassword] = useState<ValidatedText>({ value: '', error: '' })
  const [busy, setBusy] = useState(false)

  const signin: () => Promise<void> = async () => {

  }

  return (
    <form className='auth-form'>
      {busy && <LinearProgress />}
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
        <Button onClick={signin} fullWidth variant='contained'>
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
