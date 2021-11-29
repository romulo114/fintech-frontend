import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Box, Link, Button, LinearProgress } from '@mui/material'
import { AuthPaper } from 'components/auth'
import { Message, MessageType, PageTitle } from 'components/base'
import { useTitle } from 'contexts/app'
import { DASHBOARD_URL } from 'types/user'
import { useQuery } from 'hooks/use-query'
import { useAuthenticate } from 'hooks/auth'

export const ConfirmEmailPage: React.FC = () => {

  const confirmToken = useQuery().get('confirm_token')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  
  const { user, confirm, tokens, sendConfirm } = useAuthenticate()
  const [redir, setRedir] = useState(() => user?.active ? DASHBOARD_URL : '')
  useTitle('Confirm your email')
  
  useEffect(() => {
    if (!confirmToken) {
      return
    }

    const confirmFn = async (): Promise<void> => {
      try {
        setBusy(true)
        setError({})

        await confirm(confirmToken)

        setError({ type: 'success', message: 'Email confirmed. Redirecting ...' })
        setTimeout(() => setRedir(DASHBOARD_URL), 3000)
      } catch (e: any) {
        setError({ type: 'error', message: e.message ?? 'Internal Server Error'})
      } finally {
        setBusy(false)
      }
    }

    confirmFn()
  }, [confirmToken, confirm])

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

  if (redir) {
    return <Redirect to={redir} />
  }

  return (
    <AuthPaper className='simple-paper'>
      <PageTitle>
        Confirm your email
      </PageTitle>
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
