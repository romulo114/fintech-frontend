import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, Button, Container } from '@mui/material';
import { useQuery } from 'react-query';
import { PageTitle } from 'components/base';
import { PortfolioTable } from 'components/user';
import { useTitle } from 'contexts/app';
import { PortfolioApis } from 'service/portfolios';
import { delayedFunc } from 'utils/delay';
import { useNotification } from 'hooks/use-notification';

export const PortfoliosPage: React.FC = () => {

  useTitle('My Portfolios');

  const navigate = useNavigate();
  const { sendNotification } = useNotification();
  const { data: portfolios, isLoading } = useQuery('portfolios', {
    queryFn: delayedFunc(PortfolioApis.getAll),
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    }
  });

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

      {isLoading && <LinearProgress />}

      <section className='data-list'>
        <PortfolioTable portfolios={portfolios ?? []} onSelect={onSelect} />
      </section>
      <section className='actions'>
        <Button variant='contained' onClick={handleCreate}>
          Create
        </Button>
      </section>
    </Container>
  )
}
