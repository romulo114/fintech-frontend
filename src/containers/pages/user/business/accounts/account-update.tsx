import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, LinearProgress } from '@mui/material'
import { Message, MessageType } from 'components/base'
import { AccountForm } from './account-form'
import { useTitle } from 'contexts/app'
import { useAuthenticate } from 'hooks'
import { AccountApis } from 'service/accounts'
import { AccountInfo } from 'types'

export const AccountUpdatePage: React.FC = () => {

  useTitle('Update account')

  const { accountId } = useParams<{ accountId: string }>()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [account, setAccount] = useState<AccountInfo | null>(null)
  const { tokens } = useAuthenticate()

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setBusy(true)
        const data = await AccountApis.get(+accountId)
        setAccount(data)
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [tokens?.accessToken, accountId])

  return (
    <Container maxWidth='sm' sx={{ p: 3, mt: 4 }}>
      {busy && (<LinearProgress />)}
      {error.type && <Message type={error.type}>{error.message}</Message>}
      {account && (<AccountForm account={account} />)}
    </Container>
  )
}
