import React, { useState, MouseEventHandler, MouseEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { Box, Link, Button, LinearProgress } from '@mui/material'
import { AuthPaper } from 'components/auth'
import { ValidatedInput } from 'components/form'
import { ValidatedText } from 'types/validate'
import { DASHBOARD_URL } from 'types/user'
import { emailValidators } from 'utils/validators'
import { useAuthenticate } from 'hooks/auth'
import { Message, MessageType, PageTitle } from 'components/base'

export const ForgotPasswordPage: React.FC = () => {

  const [email, setEmail] = useState<ValidatedText>({ value: '', error: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})

  const { user, forgotPass } = useAuthenticate()

  const sendCode: MouseEventHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      setBusy(true)
      setError({})

      await forgotPass(email.value)

      setError({ type: 'success', message: 'Email was sent. Please check your mail.' })
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }

  if (user) {
    return <Redirect to={DASHBOARD_URL} />
  }

  return (
    <AuthPaper className='simple-paper'>
      <PageTitle>
        Reset your password
      </PageTitle>
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
        <Box component='div' className='links'>
          <Link href='/auth/signin' variant='button'>
            Sign in
          </Link>
          <Button
            variant='contained'
            onClick={sendCode}
            type='submit'
            disabled={!!email.error || !email.value}
          >
            Reset
          </Button>
        </Box>
      </form>
    </AuthPaper>
  )
}
