import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Box, Link, Button, LinearProgress } from '@mui/material'
import { AuthPaper } from 'components/auth'
import { Message, MessageType } from 'components/base'
import { FormTitle } from 'components/form'
import { DASHBOARD_URL } from 'types/user'
import { useQuery } from 'hooks/use-query'
import { useAuthenticate } from 'hooks/auth'

export const ConfirmEmailPage: React.FC = () => {

  const confirmToken = useQuery().get('confirm_token')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  
  const { user, confirm, tokens, sendConfirm } = useAuthenticate()
  const [redir, setRedir] = useState(() => user?.active ? DASHBOARD_URL : '')
  
  useEffect(() => {
    if (!tokens?.accessToken || !confirmToken) {
      return
    }

    const confirmFn = async (): Promise<void> => {
      try {
        setBusy(true)
        setError({})

        await confirm(tokens.accessToken, confirmToken)

        setError({ type: 'success', message: 'Email confirmed. Redirecting ...' })
        setTimeout(() => setRedir(DASHBOARD_URL), 3000)
      } catch (e: any) {
        setError({ type: 'error', message: e.message ?? 'Internal Server Error'})
      } finally {
        setBusy(false)
      }
    }

    confirmFn()
  }, [confirmToken, tokens?.accessToken, confirm])

  const onResend = async (): Promise<void> => {
    if (!tokens?.accessToken) {
      return
    }

    try {
      setBusy(true)
      setError({})

      await sendConfirm(tokens.accessToken)

      setError({ type: 'success', message: 'Email was sent.' })
    } catch (e: any) {
      setError({ type: 'error', message: e.message ?? 'Internal Server Error'})
    } finally {
      setBusy(false)
    }
  }

  if (redir) {
    return <Redirect to={redir} />
  }

  return (
    <AuthPaper className='simple-paper'>
      <FormTitle>
        Confirm your email
      </FormTitle>
      <form className='auth-form'>
        {busy && <LinearProgress />}
        {error.type && (
          <Message type={error.type}>{error.message}</Message>
        )}
        <Box component='div' className='links'>
          <Link href='/' variant='button'>
            Home
          </Link>
          <Button variant='contained' onClick={onResend}>
            ReSend
          </Button>
        </Box>
      </form>
    </AuthPaper>
  )
}
