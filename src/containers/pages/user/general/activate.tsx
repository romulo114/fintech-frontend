import React, { useState } from 'react'
import { useLocation, Redirect } from 'react-router-dom'
import { Button, Paper, LinearProgress } from '@mui/material'
import { Message, MessageType } from 'components/base'
import { useTitle } from 'contexts/app'
import { useAuthenticate } from 'hooks/auth'
import { DASHBOARD_URL } from 'types/user'

export const ActivateUser: React.FC = () => {

  useTitle('Activate')
  const { user, tokens, sendConfirm } = useAuthenticate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})

  const location = useLocation<{ referrer?: string }>()
  const onResend = async (): Promise<void> => {
    try {
      setBusy(true)
      setError({})

      await sendConfirm()

      setError({ type: 'success', message: 'Email was sent.' })
    } catch (e: any) {
      setError({ type: 'error', message: e.message ?? 'Internal Server Error'})
    } finally {
      setBusy(false)
    }
  }

  if (user?.active) {
    return <Redirect to={location.state?.referrer ?? DASHBOARD_URL} />
  }

  return (
    <Paper
      sx={{ padding: theme => theme.spacing(3) }}
      className='activate-paper'
    >
      <div className='title'>
        <p>Please activate your account by checking confirmation email.</p>
      </div>
      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}
      <div className='actions'>
        <span className='desc'>Don&apos;t received email yet? </span>
        <Button onClick={onResend} variant='contained'>
          Resend
        </Button>
      </div>
    </Paper>
  )
}
