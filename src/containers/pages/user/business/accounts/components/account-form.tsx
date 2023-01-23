import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { ValidatedInput } from 'components/form';
import { ValidatedText } from 'types/validate';
import { requireValidators } from 'utils/validators';
import { AccountInfo } from 'types';

export type AccountData = {
  accountNo: string;
  brokerName: string;
}

type AccountFormProps = {
  account?: AccountInfo;
  onSave: (accountNo: string, brokerName: string) => Promise<void>;
}
export const AccountForm: React.FC<AccountFormProps> = ({ account, onSave }) => {

  const [accountNo, setAccountNo] = useState<ValidatedText>(
    { value: account?.accountNo ?? '', error: '' }
  );
  const [brokerName, setBrokerName] = useState<ValidatedText>(
    { value: account?.brokerName ?? '', error: '' }
  );

  const onSubmit: React.MouseEventHandler = async (e): Promise<void> => {
    e.preventDefault();
    onSave(accountNo.value, brokerName.value);
  }

  const disabled = !!accountNo.error || !!brokerName.error || !accountNo.value || !brokerName.value;

  return (
    <form className='account-form'>
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
