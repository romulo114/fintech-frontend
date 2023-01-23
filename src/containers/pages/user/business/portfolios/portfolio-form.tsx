import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, LinearProgress } from '@mui/material';
import { useQueryClient, useMutation } from 'react-query';
import { PageTitle } from 'components/base';
import { ValidatedInput } from 'components/form';
import { useNotification } from 'hooks/use-notification';
import { PortfolioApis, PortfolioPayload } from 'service/portfolios';
import { ValidatedText } from 'types/validate';
import { requireValidators } from 'utils/validators';
import { delayedCall } from 'utils/delay';

export const PortfolioForm = () => {
  const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const client = useQueryClient();
  const { isLoading, mutate } = useMutation((body: PortfolioPayload) => {
    return delayedCall(PortfolioApis.create(body));
  }, {
    onSuccess: () => {
      sendNotification('Portfolio created. Redirecting ...', 'success', 1500);
      client.invalidateQueries('portfolios');
      setTimeout(() => {
        navigate('/user/business/portfolios');
      }, 1200);
    }, 
    onError: (e: any) => {
      sendNotification(e.message ?? 'Unknown error', 'error', 3000);
    }
  })

  const [name, setName] = useState<ValidatedText>({ value: '', error: '' });
  const disabled = !!name.error || !name.value;

  const onSubmit: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    mutate({ name: name.value });
  }

  return (
    <form className='portfolio-form'>
      <PageTitle>
        Create your Portfolio
      </PageTitle>

      {isLoading && <LinearProgress />}

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
