import React, { useState } from 'react'
import { Box, Link, Button, LinearProgress } from '@mui/material'
import { AuthPaper } from 'components/auth'
import { Message, MessageType, PageTitle } from 'components/base'
import { ValidatedInput } from 'components/form'
import { useTitle } from 'contexts/app'
import { useQuery } from 'hooks/use-query'
import { useAuthenticate } from 'hooks/auth'
import { passValidators, confirmValidators } from 'utils/validators'
import { ValidatedText } from 'types/validate'

export const ResetPasswordPage: React.FC = () => {

  useTitle('Reset password')
  const resetToken = useQuery().get('reset_token')

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [password, setPassword] = useState<ValidatedText>({ value: '', error: '' })
  const [confirm, setConfirm] = useState<ValidatedText>({ value: '', error: '' })

  const { resetPass } = useAuthenticate()

  const onReset = async (): Promise<void> => {
    if (!resetToken) {
      return
    }

    try {
      setBusy(true)
      setError({})

      await resetPass(resetToken, password.value)

      setError({ type: 'success', message: 'Password was reset successfully.' })
    } catch (e: any) {
      setError({ type: 'error', message: e.message ?? 'Internal Server Error' })
    } finally {
      setBusy(false)
    }
  }

  const enabled = !!password.value && !!confirm.value &&
    !password.error && !confirm.error

  return (
    <AuthPaper className='simple-paper'>
      <PageTitle>
        Reset your password
      </PageTitle>
      <form className='auth-form'>
        {busy && <LinearProgress />}
        {error.type && (
          <Message type={error.type}>{error.message}</Message>
        )}
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
        <Box component='div' className='links'>
          <Link href='/auth/signin' variant='button'>
            Sign in
          </Link>
          <Button variant='contained' onClick={onReset} disabled={!enabled}>
            Reset
          </Button>
        </Box>
      </form>
    </AuthPaper>
  )
}
