import React, { useState } from 'react'
import { LinearProgress, Button } from '@mui/material'
import { PageTitle } from 'components/base'
import { ValidatedInput } from 'components/form'
import { useTitle } from 'contexts/app'
import { TradeApis } from 'service/trade'
import { requireValidators } from 'utils/validators'
import { delayedCall } from 'utils/delay';
import { ValidatedText } from 'types/validate'
import { TradeInfo } from 'types'
import { TradeTable } from 'components/user/trade-table'
import { useMutation, useQuery } from 'react-query'
import { useNotification } from 'hooks/use-notification'

export const TradeList: React.FC = () => {
  
  useTitle('My Trades')

  const [creating , setCreating] = useState(false);
  const [name, setName] = useState<ValidatedText>({ value: '', error: '' });

  const { sendNotification } = useNotification();
  const [trades, setTrades] = useState<TradeInfo[]>([])

  const { isLoading, refetch } = useQuery({
    queryFn: async () => {
      return await delayedCall(TradeApis.getAll());
    },
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    },
    onSuccess: (data: TradeInfo[]) => {
      setTrades(data);
    }
  })

  const { mutate: createTrade, isLoading: busy } = useMutation({
    mutationFn: ({ name }: { name: string }) => {
      return delayedCall(TradeApis.create({ name }));
    },
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    },
    onSuccess: () => {
      sendNotification('Trade created successfully', 'success', 3000);
      setCreating(false);
      refetch();
    },
  });

  const handleCreate = async () => {
    if (!creating) {
      setCreating(true);
    } else {
      createTrade({ name: name.value });
    }
  }

  const handleCancel = () => setCreating(false);

  const disabled = creating && busy;
``
  return (
    <>
      <PageTitle>My Trades</PageTitle>

      {(isLoading || busy) && <LinearProgress />}

      <section className='data-list'>
        <TradeTable trades={trades} />
      </section>

      {creating && (
        <form className='trade-form'>
          <ValidatedInput
            fullWidth
            id='strategy-name'
            label='Name'
            variant='standard'
            className='input'
            validators={requireValidators}
            value={name}
            setValue={setName}
          />
        </form>
      )}

      <section className='actions'>
        {creating && (
          <Button variant='outlined' onClick={handleCancel} sx={{ mr: 2 }}>
            Cancel
          </Button>
        )}
        <Button variant='contained' onClick={handleCreate} disabled={disabled}>
          Create
        </Button>
      </section>
    </>
  )
}
