import React, { useState } from 'react'
import { Box, Link, Button } from '@mui/material'
import { AuthPaper, AuthTitle } from 'components/auth'
import { ValidatedInput } from 'components/form'
import { ValidatedText } from 'types/validate'
import { emailValidators } from 'utils/validators'

export const ConfirmEmailPage: React.FC = () => {

  const [email, setEmail] = useState<ValidatedText>({ value: '', error: '' })
  const sendCode = async (): Promise<void> => {

  }

  return (
    <AuthPaper className='simple-paper'>
      <AuthTitle>
        Reset your password
      </AuthTitle>
      <form className='auth-form'>
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
        <Box component='div' className='links'>
          <Link href='/auth/signin' variant='button'>
            Sign in
          </Link>
          <Button variant='contained' onClick={sendCode}>
            Send Code
          </Button>
        </Box>
      </form>
    </AuthPaper>
  )
}
