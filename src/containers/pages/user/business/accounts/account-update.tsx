import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, LinearProgress, Grid } from '@mui/material';
import { Message, MessageType, PageTitle } from 'components/base';
import { AccountForm, AccountPositions } from './components';
import { useTitle } from 'contexts/app';
import { useAuthenticate } from 'hooks';
import { AccountApis } from 'service/accounts';
import { AccountInfo } from 'types';

export const AccountUpdatePage: React.FC = () => {

  useTitle('Update account')

  const { accountId } = useParams<{ accountId: string }>()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [account, setAccount] = useState<AccountInfo>()
  const { tokens } = useAuthenticate()

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      if (!accountId) return;

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
    <Container maxWidth='lg' sx={{ p: 3, mt: 3 }}>
      <PageTitle>
        {account ? 'Update your Account' : 'Create your Account'}
      </PageTitle>

      {busy && (<LinearProgress />)}
      {error.type && <Message type={error.type}>{error.message}</Message>}
      {account && (
        <Grid container spacing={6}>
          <Grid item xs={12} md={account ? 4 : 12}>
            <AccountForm account={account} />
          </Grid>
          <Grid item xs={12} md={8}>
            <AccountPositions account={account} />
          </Grid>
        </Grid>
      )}
    </Container>
  )
}
