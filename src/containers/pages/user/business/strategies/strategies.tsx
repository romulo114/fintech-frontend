import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, Button, ToggleButtonGroup, ToggleButton, Container } from '@mui/material';
import { MessageType, Message, PageTitle } from 'components/base';
import { StrategyTable } from 'components/user';
import { useTitle } from 'contexts/app';
import { ModelApis } from 'service/models';
import { ModelInfo } from 'types/model';
import { delayedCall } from 'utils/delay';

export const StrategyList: React.FC = () => {

  useTitle('My Strategies')

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({})
  const [busy, setBusy] = useState(false)

  const [mine, setMine] = useState(true)
  const [models, setModels] = useState<ModelInfo[]>([])
  const [publics, setPublics] = useState<ModelInfo[]>([])
  const [privates, setPrivates] = useState<ModelInfo[]>([])
  const naviagate = useNavigate()

  const handleChange = useCallback((
    event: React.MouseEvent<HTMLElement>,
    value: string,
  ) => {
    setMine(value === 'mine')
  }, [])

  const handleCreate = useCallback(() => {
    naviagate('/user/business/strategies/create');
  }, [naviagate]);

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setBusy(true)
        setError({})
        
        const result = await delayedCall(Promise.all([
          ModelApis.getAll(false),
          ModelApis.getAll(true)
        ]));

        setPrivates(result[0])
        setPublics(result[1])
      } catch (e: any) {
        setError({ type: 'error', message: e.message })
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [])

  useEffect(() => {
    setModels(mine ? privates : publics)
  }, [mine, publics, privates])

  return (
    <Container maxWidth='md'>
      <PageTitle>My Strategies</PageTitle>

      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

      <section className='data-list'>
        <ToggleButtonGroup
          color='primary'
          value={mine ? 'mine': 'public'}
          exclusive
          onChange={handleChange}
          size='small'
          sx={{ my: 1 }}
          disabled={busy}
        >
          <ToggleButton value='mine'>My Strategies</ToggleButton>
          <ToggleButton value='public'>Public Strategies</ToggleButton>
        </ToggleButtonGroup>

        <StrategyTable models={models} />
      </section>

      <section className='actions'>
        <Button variant='contained' onClick={handleCreate}>
          Create
        </Button>
      </section>
    </Container>
  )
}
