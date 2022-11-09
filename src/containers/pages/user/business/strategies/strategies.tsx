import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, Button, ToggleButtonGroup, ToggleButton, Container } from '@mui/material';
import { PageTitle } from 'components/base';
import { StrategyTable } from 'components/user';
import { useTitle } from 'contexts/app';
import { ModelApis } from 'service/models';
import { ModelInfo } from 'types/model';
import { delayedCall } from 'utils/delay';
import { useQuery } from 'react-query';
import { useNotification } from 'hooks/use-notification';

export const StrategyList: React.FC = () => {

  useTitle('My Strategies')

  const { sendNotification } = useNotification();

  const [mine, setMine] = useState(true);
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [publics, setPublics] = useState<ModelInfo[]>([]);
  const [privates, setPrivates] = useState<ModelInfo[]>([]);
  const naviagate = useNavigate();

  const handleChange = useCallback((
    event: React.MouseEvent<HTMLElement>,
    value: string,
  ) => {
    setMine(value === 'mine')
  }, []);

  const handleCreate = useCallback(() => {
    naviagate('/user/business/strategies/create');
  }, [naviagate]);

  const { isLoading } = useQuery({
    queryFn: async () => {
      return await delayedCall(Promise.all([
        ModelApis.getAll(false),
        ModelApis.getAll(true)
      ]));
    },
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    },
    onSuccess: (data: ModelInfo[][]) => {
      setPrivates(data[0]);
      setPublics(data[1]);
    }
  })

  useEffect(() => {
    setModels(mine ? privates : publics)
  }, [mine, publics, privates])

  return (
    <Container maxWidth='md'>
      <PageTitle>My Strategies</PageTitle>

      {isLoading && <LinearProgress />}

      <section className='strategy-list'>
        <ToggleButtonGroup
          color='primary'
          value={mine ? 'mine' : 'public'}
          exclusive
          onChange={handleChange}
          size='small'
          sx={{ my: 1 }}
          disabled={isLoading}
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
