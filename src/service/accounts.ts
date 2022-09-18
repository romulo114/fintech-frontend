import { useCallback, useEffect, useState } from 'react';
import { httpClient, BASE_URL } from './base';
import { AccountInfo, AccountPosition } from 'types/account';

const ACCOUNTS_BASE = `${BASE_URL}/accounts`;

function mapPositions(positions: any[]): AccountPosition[] {
  return positions.map(pos => ({
    id: pos.id,
    isCash: pos.is_cash,
    shares: pos.shares,
    price: pos.price,
    symbol: pos.symbol
  }))
}
export function map2Account(data: any): AccountInfo {
  const account: AccountInfo = {
    id: data.id,
    accountNo: data.account_number,
    brokerName: data.broker_name,
    portfolioId: data.portfolio_id,
    positions: mapPositions(data.account_positions ?? []),
    userId: data.user_id
  }

  return account
}

type AccountPayload = {
  accountNo?: string;
  brokerName?: string;
}
export const AccountApis = {
  getAll: async (): Promise<AccountInfo[]> => {
    const { accounts } = await httpClient.authGet(`${ACCOUNTS_BASE}`);
    return accounts.map(map2Account);
  },

  create: async (payload: AccountPayload): Promise<AccountInfo[]> => {
    return await httpClient.authPost(`${ACCOUNTS_BASE}`, {
      account_number: payload.accountNo,
      broker_name: payload.brokerName
    });
  },

  get: async (id: number): Promise<AccountInfo> => {
    const data = await httpClient.authGet(`${ACCOUNTS_BASE}/${id}`);
    return map2Account(data);
  },

  update: async (id: number, payload: AccountPayload): Promise<AccountInfo> => {
    const updatePayload: any = {};
    payload.accountNo && (updatePayload.account_number = payload.accountNo);
    payload.brokerName && (updatePayload.broker_name = payload.brokerName);

    const data = await httpClient.authPut(`${ACCOUNTS_BASE}/${id}`, updatePayload);
    return map2Account(data);
  },

  delete: async (id: number): Promise<void> => {
    return await httpClient.authDelete(`${ACCOUNTS_BASE}/${id}`)
  },

  createPosition: async (
    id: number, symbol: string, shares: number, isCash: boolean
  ) => {
    return httpClient.authPost(
      `${ACCOUNTS_BASE}/${id}/positions`,
      { symbol, shares, is_cash: isCash }
    );
  },

  updatePosition: async (id: number, positions: AccountPosition[]) => {
    return httpClient.authPut(
      `${ACCOUNTS_BASE}/${id}/positions`,
      { positions: positions.map(pos => ({ ...pos, is_cash: pos.isCash })) }
    );
  }
}

export const useAccount = (id: number) => {
  const [account, setAccount] = useState<AccountInfo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refetch = async (id: number) => {
    const account = await AccountApis.get(id);
    setAccount(account);
  }

  useEffect(() => {
    const fetchAccount = async (id: number) => {
      setLoading(true);
      try {
        await refetch(id);
      } catch (e: any) {
        setError(e.message ?? JSON.stringify(e));
      } finally {
        setLoading(false);
      }
    }

    fetchAccount(id);
  }, [id]);

  const addPosition = useCallback(async (
    symbol: string,
    share: number,
    isCash: boolean
  ) => {
    await AccountApis.createPosition(id, symbol, share, isCash);
    await refetch(id);
  }, [id]);

  const updatePositions = useCallback(async (positions: AccountPosition[]) => {
    await AccountApis.updatePosition(id, positions);
    await refetch(id);
  }, [id]);


  return {
    account, loading, error,
    addPosition, updatePositions, refetch
  };
}
