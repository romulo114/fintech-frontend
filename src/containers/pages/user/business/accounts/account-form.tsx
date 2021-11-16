import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Typography, LinearProgress } from '@mui/material'
import { ValidatedInput } from 'components/form'
import { ValidatedText } from 'types/validate'
import { requireValidators } from 'utils/validators'
import { AccountApis } from 'service/accounts'
import { useAuthenticate } from 'hooks'
import { Message, MessageType } from 'components/base'

export type AccountData = {
  accountNo: string;
  brokerName: string;
}

export const AccountForm: React.FC = () => {

  const [accountNo, setAccountNo] = useState<ValidatedText>({ value: '', error: '' })
  const [brokerName, setBrokerName] = useState<ValidatedText>({ value: '', error: '' })
  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)

  const { tokens } = useAuthenticate()
  const history = useHistory()

  const onSubmit: React.MouseEventHandler = async (e): Promise<void> => {
    e.preventDefault()

    try {
      setError({})
      setBusy(true)

      await AccountApis.create(tokens?.accessToken ?? '', {
        accountNo: accountNo.value,
        brokerName: brokerName.value
      })
      setError({ type: 'success', message: 'Account created' })
      setTimeout(() => {
        history.push('/user/business/accounts')
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
      <Typography component='h6' variant='h6' textAlign="center">
        Create your Account
      </Typography>
      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}
      <section className='input-group'>
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
      </section>

      <section className='actions'>
        <Button type='submit' variant='contained' onClick={onSubmit} disabled={disabled}>
          Create
        </Button>
      </section>
    </form>
  )
}
