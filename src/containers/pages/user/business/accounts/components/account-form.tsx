import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, LinearProgress, Typography, Box } from '@mui/material';
import { ValidatedInput } from 'components/form';
import { ValidatedText } from 'types/validate';
import { requireValidators } from 'utils/validators';
import { AccountApis } from 'service/accounts';
import { Message, MessageType } from 'components/base';
import { AccountInfo } from 'types';

export type AccountData = {
  accountNo: string;
  brokerName: string;
}

type AccountFormProps = {
  account?: AccountInfo;
}
export const AccountForm: React.FC<AccountFormProps> = ({ account }) => {

  const [accountNo, setAccountNo] = useState<ValidatedText>(
    { value: account?.accountNo ?? '', error: '' }
  )
  const [brokerName, setBrokerName] = useState<ValidatedText>(
    { value: account?.brokerName ?? '', error: '' }
  )
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)

  const navigate = useNavigate()

  const onSubmit: React.MouseEventHandler = async (e): Promise<void> => {
    e.preventDefault()

    try {
      setError({})
      setBusy(true)

      if (account) {
        await AccountApis.update(account.id, {
          accountNo: accountNo.value,
          brokerName: brokerName.value
        })
        setError({ type: 'success', message: 'Account updated' })

      } else {
        await AccountApis.create({
          accountNo: accountNo.value,
          brokerName: brokerName.value
        })
        setError({ type: 'success', message: 'Account created' })
      }

      setTimeout(() => {
        navigate('/user/business/accounts');
      }, 2000)
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }

  const disabled = !!accountNo.error || !!brokerName.error || !accountNo.value || !brokerName.value

  return (
    <form className='account-form'>
      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant='h3' sx={{ fontSize: 20, fontWeight: 600 }}>
          Summary
        </Typography>
        <ValidatedInput
          fullWidth
          id='account-no'
          label='Account Number'
          variant='standard'
          className='input'
          validators={requireValidators}
          value={accountNo}
          setValue={setAccountNo}
        />
        <ValidatedInput
          fullWidth
          id='broker-name'
          label='Broker Name'
          variant='standard'
          className='input'
          validators={requireValidators}
          value={brokerName}
          setValue={setBrokerName}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type='submit'
            variant='contained'
            onClick={onSubmit}
            disabled={disabled}
            sx={{ lineHeight: 1.6 }}
          >
            {account ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Box>
    </form>
  )
}
