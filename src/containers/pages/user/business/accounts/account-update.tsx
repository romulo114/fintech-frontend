import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, LinearProgress, Grid } from '@mui/material';
import { Message, PageTitle } from 'components/base';
import { AccountForm, AccountPositions } from './components';
import { useTitle } from 'contexts/app';
import { useAccount } from 'service/accounts';
import { BusinessPrices } from './components/business-prices';

export const AccountUpdatePage: React.FC = () => {

  useTitle('Update account')

  const { accountId } = useParams<{ accountId: string }>();
  const id = +(accountId ?? 0);
  const {
    account, loading, error: actionErr,
    updatePositions, refetch
  } = useAccount(id);

  const onDeletePrice = async () => {
    await refetch(id);
  };

  return (
    <Container maxWidth='lg' sx={{ p: 3, mt: 2 }}>
      <PageTitle>
        {account ? 'Update your Account' : 'Create your Account'}
      </PageTitle>

      {loading && (<LinearProgress />)}
      {!!actionErr && <Message type='error'>{actionErr}</Message>}
      {account && (
        <Grid container spacing={6}>
          <Grid item xs={12} md={account ? 4 : 12}>
            <AccountForm account={account} />
          </Grid>
          <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <AccountPositions
              account={account}
              onUpdatePositions={updatePositions}
            />
            <BusinessPrices onDelete={onDeletePrice} />
          </Grid>
        </Grid>
      )}
    </Container>
  )
}
