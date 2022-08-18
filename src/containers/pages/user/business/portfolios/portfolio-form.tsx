import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, LinearProgress } from '@mui/material'
import { ValidatedInput } from 'components/form'
import { ValidatedText } from 'types/validate'
import { requireValidators } from 'utils/validators'
import { Message, MessageType, PageTitle } from 'components/base'
import { PortfolioApis } from 'service/portfolios'

export const PortfolioForm = () => {

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({});
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState<ValidatedText>({ value: '', error: '' });

  const navigate = useNavigate();

  const disabled = !!name.error || !name.value;

  const onSubmit: React.MouseEventHandler = async (e): Promise<void> => {
    e.preventDefault();

    try {
      setError({});
      setBusy(true);

      await PortfolioApis.create({ name: name.value });
      setError({ type: 'success', message: 'Portfolio created' });
      setTimeout(() => {
        navigate('/user/business/portfolios');
      }, 1500)
    } catch (e: any) {
      setError({ type: 'error', message: e.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className='portfolio-form'>
      <PageTitle>
        Create your Portfolio
      </PageTitle>

      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

      <section className='input-group'>
        <ValidatedInput
          fullWidth
          id='portfolio-name'
          label='Name'
          variant='standard'
          className='input'
          validators={requireValidators}
          value={name}
          setValue={setName}
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
