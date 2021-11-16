import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Paper, Container, LinearProgress, Typography } from '@mui/material'
import { AccountForm } from './account-form'
import { AccountApis } from 'service/accounts'
import { useAuthenticate } from 'hooks'
import { AccountInfo } from 'types'

export const AccountUpdatePage: React.FC = () => {

  const { accountId } = useParams<{ accountId: string }>()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [account, setAccount] = useState<AccountInfo | null>(null)
  const { tokens } = useAuthenticate()
  
  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setBusy(true)
        const data = await AccountApis.get(tokens?.accessToken ?? '', +accountId)
        console.log(data)
        setAccount(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [tokens?.accessToken, accountId])

  return (
    <Container maxWidth='sm'>
      <Paper sx={{ p: 3, mt: 4 }}>
        {account && (<AccountForm account={account} />)}
        {busy && (<LinearProgress />)}
        {error && (<Typography className='error'>{error}</Typography>)}
      </Paper>
    </Container>
  )
}
