import { httpClient, BASE_URL } from './base'
import { AccountInfo } from 'types/account'

const ACCOUNTS_BASE = `${BASE_URL}/accounts`

export function map2Account(data: any): AccountInfo {
  const account: AccountInfo = {
    id: data.id,
    accountNo: data.account_number,
    brokerName: data.broker_name,
    portfolioId: data.portfolio_id,
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
    const { accounts } = await httpClient.authGet(`${ACCOUNTS_BASE}`)
    return accounts.map(map2Account)
  },

  create: async (payload: AccountPayload): Promise<AccountInfo[]> => {
    return await httpClient.authPost(`${ACCOUNTS_BASE}`, {
      account_number: payload.accountNo,
      broker_name: payload.brokerName
    })
  },

  get: async (id: number): Promise<AccountInfo> => {
    const data = await httpClient.authGet(`${ACCOUNTS_BASE}/${id}`)
    return map2Account(data)
  },

  update: async (id: number, payload: AccountPayload): Promise<AccountInfo> => {
    const updatePayload: any = {}
    payload.accountNo && (updatePayload.account_number = payload.accountNo)
    payload.brokerName && (updatePayload.broker_name = payload.brokerName)

    const data = await httpClient.authPut(`${ACCOUNTS_BASE}/${id}`, updatePayload)
    return map2Account(data)
  },

  delete: async (id: number): Promise<void> => {
    return await httpClient.authDelete(`${ACCOUNTS_BASE}/${id}`)
  }
}
