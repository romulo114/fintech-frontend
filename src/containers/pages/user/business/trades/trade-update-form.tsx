import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LinearProgress, Grid } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { PageTitle } from 'components/base';
import { useNotification } from 'hooks/use-notification';
import { PortfolioApis } from 'service/portfolios';
import { TradeApis } from 'service/trade';
import { TradeBaseInfo, TradeInfo } from 'types';
import { TradeEdit, TradePortfolioEdit } from './components';

export const TradeUpdateForm: React.FC = () => {
  const navigate = useNavigate();
  const { tradeId } = useParams<{ tradeId: string }>();
  
  const { sendNotification } = useNotification();
  const [trade, setTrade] = useState<TradeInfo | null>(null);

  const {
    data: allPortfolios,
    isLoading: loadingPortfolios,
  } = useQuery('portfolios', {
    queryFn: PortfolioApis.getAll,
    initialData: [],
    onError: (e: any) => sendNotification(e.message, 'error', 3000)
  });

  const {
    data: activePortfolios,
    isLoading: loadingActive,
    refetch: reloadActive
  } = useQuery('activePortfolios', {
    queryFn: TradeApis.getActivePortfolios,
    initialData: [],
    onError: (e: any) => sendNotification(e.message, 'error', 3000)
  });

  const { isLoading } = useQuery(`trade-${tradeId}`, {
    queryFn: () => TradeApis.get(+(tradeId ?? 0)),
    onSuccess: (trade: TradeInfo) => {
      setTrade(trade);
    },
    onError: (e: any) => sendNotification(e.message, 'error', 3000)
  });

  const { isLoading: updating, mutate: updateTrade } = useMutation({
    mutationFn: (values: TradeBaseInfo) => {
      return TradeApis.update(+(tradeId ?? 0), values);
    },
    onSuccess: (updated: TradeInfo) => {
      sendNotification('Strategy updated.', 'success', 3000);
      setTrade(updated);
    },
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    }
  });

  const { isLoading: updatingPortfolios, mutate: updatePortfolios } = useMutation({
    mutationFn: ({ portfolios }: { portfolios: number[] }) => {
      return TradeApis.updatePortfolios(+(tradeId ?? 0), { portfolios });
    },
    onSuccess: (updated: TradeInfo) => {
      sendNotification('Portfolios saved.', 'success', 3000);
      setTrade(updated);
      reloadActive();
    },
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    }
  });

  const { isLoading: togglingStatus, mutate: toggleStatus } = useMutation({
    mutationFn: async ({ portfolioId, status }: { portfolioId: number, status: boolean }) => {
      await TradeApis.updatePortfolio(+(tradeId ?? 0), portfolioId, status);
      return await TradeApis.get(+(tradeId ?? 0));
    },
    onSuccess: (updated: TradeInfo) => {
      sendNotification('Portfolio status changed.', 'success', 3000);
      setTrade(updated);
    },
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    }
  });

  const { isLoading: deleting, mutate: deleteTrade } = useMutation({
    mutationFn: async () => {
      return TradeApis.delete(+(tradeId ?? 0));
    },
    onSuccess: () => {
      sendNotification('Trade deleted.', 'success', 3000);
      setTimeout(() => {
        navigate('/user/business/trades');
      }, 2000);
    },
    onError: (e: any) => {
      sendNotification(e.message, 'error', 3000);
    }
  });

  const busy = (
    updating || updatingPortfolios || togglingStatus || deleting ||
    loadingPortfolios || loadingActive || isLoading
  );
  return (
    <>
      <PageTitle>Update Trade</PageTitle>

      {busy && <LinearProgress />}

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          {trade && (
            <TradeEdit
              trade={trade}
              onUpdateTrade={updateTrade}
              onDeleteTrade={deleteTrade}
            />
          )}
        </Grid>
        <Grid item xs={12} md={8}>
          {trade && !!allPortfolios && !!activePortfolios && (
            <TradePortfolioEdit
              {...{
                trade,
                allPortfolios,
                activePortfolios
              }}
              onUpdatePortfolio={updatePortfolios}
              onToggleStatus={toggleStatus}
            />
          )}
        </Grid>
      </Grid>
    </>
  )
}
