import React, { useState } from 'react';
import { Container, LinearProgress } from '@mui/material'
import { useTitle } from 'contexts/app';
import { PageTitle } from 'components/base';
import { AccountApis } from 'service/accounts';
import { delayedCall } from 'utils/delay';
import { useNotification } from 'hooks/use-notification';
import { AccountForm } from './components';

export const AccountCreatePage: React.FC = () => {

  useTitle('Create account');

  const [busy, setBusy] = useState(false);
  const { sendNotification } = useNotification();

  const onCreate = async (accountNo: string, brokerName: string) => {
    setBusy(true);
    try {
      await delayedCall(AccountApis.create({ accountNo, brokerName }));
      sendNotification('Account created', 'success', 3000);
    } catch (e: any) {
      sendNotification(e.message, 'error', 3000);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Container maxWidth='sm' sx={{ p: 3, mt: 3 }}>
      <PageTitle>Create your Account</PageTitle>

      {busy && (<LinearProgress sx={{ my: 1 }} />)}
      <AccountForm onSave={onCreate} />
    </Container>
  )
}

