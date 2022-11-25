import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, LinearProgress, Grid } from '@mui/material';
import { Message, PageTitle } from 'components/base';
import { useTitle } from 'contexts/app';
import { useAccount, AccountApis } from 'service/accounts';
import { delayedCall } from 'utils/delay';
import { useNotification } from 'hooks/use-notification';
import { AccountForm, AccountPositions } from './components';

export const AccountUpdatePage: React.FC = () => {

  useTitle('Update account');

  const [busy, setBusy] = useState(false);
  const { sendNotification } = useNotification();

  const { accountId } = useParams<{ accountId: string }>();
  const id = +(accountId ?? 0);
  const {
    account, loading, error: actionErr,
    updatePositions
  } = useAccount(id);

  const onUpdate = async (accountNo: string, brokerName: string) => {
    if (!account) return;

    setBusy(true);
    try {
      await delayedCall(AccountApis.update(account.id, { accountNo, brokerName }));
      sendNotification('Account updated', 'success', 3000);
    } catch (e: any) {
      sendNotification(e.message, 'error', 3000);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Container maxWidth='lg' sx={{ p: 3, mt: 2 }}>
      <PageTitle>
        {account ? 'Update your Account' : 'Create your Account'}
      </PageTitle>

      {(loading || busy) && (<LinearProgress sx={{ my: 1 }} />)}
      {!!actionErr && <Message type='error'>{actionErr}</Message>}
      {account && (
        <Grid container spacing={6}>
          <Grid item xs={12} md={account ? 4 : 12}>
            <AccountForm account={account} onSave={onUpdate} />
          </Grid>
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <AccountPositions
              account={account}
              onUpdatePositions={updatePositions}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  )
}
