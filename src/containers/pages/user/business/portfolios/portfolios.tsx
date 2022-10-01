import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, Button, Container } from '@mui/material';
import { MessageType, Message, PageTitle } from 'components/base';
import { PortfolioTable } from 'components/user';
import { useTitle } from 'contexts/app';
import { PortfolioApis } from 'service/portfolios';
import { PortfolioInfo } from 'types/portfolio';
import { delayedCall } from 'utils/delay';

export const PortfoliosPage: React.FC = () => {

  useTitle('My Portfolios');

  const [error, setError] = useState<{ type?: MessageType, message?: string }>({});
  const [busy, setBusy] = useState(false);
  const [portfolios, setPortfolios] = useState<PortfolioInfo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFn = async (): Promise<void> => {
      try {
        setError({});
        setBusy(true);

        const data = await delayedCall(PortfolioApis.getAll());
        setPortfolios(data);
      } catch (e: any) {
        setError({ type: 'error', message: e.message });
      } finally {
        setBusy(false);
      }
    }

    fetchFn();
  }, [])

  const handleCreate: React.MouseEventHandler = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();

    navigate('/user/business/portfolios/create');
    // eslint-disable-next-line
  }, []);

  const onSelect = (id: number) => {
    navigate(`/user/business/portfolios/${id}`);
  }

  return (
    <Container maxWidth='md'>
      <PageTitle>My Portfolios</PageTitle>

      {busy && <LinearProgress />}
      {error.type && <Message type={error.type}>{error.message}</Message>}

      <section className='data-list'>
        <PortfolioTable portfolios={portfolios} onSelect={onSelect} />
      </section>
      <section className='actions'>
        <Button variant='contained' onClick={handleCreate}>
          Create
        </Button>
      </section>
    </Container>
  )
}
