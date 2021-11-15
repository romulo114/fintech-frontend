import { httpClient, BASE_URL } from './base'
import { AccountInfo } from 'types/account'

const ACCOUNTS_BASE = `${BASE_URL}/accounts`

type AccountPayload = {
  accountNo?: string;
  brokerName?: string;
}
export const AccountApis = {
  getAll: async (token: string): Promise<AccountInfo[]> => {
    return await httpClient.authGet(token, `${ACCOUNTS_BASE}`)
  },

  create: async (token: string, payload: AccountPayload): Promise<AccountInfo[]> => {
    return await httpClient.authPost(token, `${ACCOUNTS_BASE}`, {
      account_number: payload.accountNo,
      broker_name: payload.brokerName
    })
  },

  update: async (token: string, id: string, payload: AccountPayload): Promise<AccountInfo> => {
    const updatePayload: any = {}
    payload.accountNo && (updatePayload.account_number = payload.accountNo)
    payload.brokerName && (updatePayload.broker_name = payload.brokerName)

    return await httpClient.authPut(token, `${ACCOUNTS_BASE}/${id}`, updatePayload)
  },

  delete: async (token: string, id: string): Promise<void> => {
    return await httpClient.authDelete(token, `${ACCOUNTS_BASE}/${id}`)
  }
}
