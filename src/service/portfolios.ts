import { httpClient, BASE_URL } from './base'
import { PortfolioInfo } from 'types/portfolio'

const PORTFOLIOS_BASE = `${BASE_URL}/portfolios`

type AccountPayload = {
  accountNo?: string;
  brokerName?: string;
}
export const PortfolioApis = {
  getAll: async (token: string): Promise<PortfolioInfo[]> => {
    const { portfolios } = await httpClient.authGet(token, `${PORTFOLIOS_BASE}`)
    return portfolios.map((item: any) => ({
      id: item.id,
      name: item.name,
      accounts: item.accounts,
      userId: item.user_id
    }))
  },

  create: async (token: string, payload: AccountPayload): Promise<PortfolioInfo[]> => {
    return await httpClient.authPost(token, `${PORTFOLIOS_BASE}`, {
      account_number: payload.accountNo,
      broker_name: payload.brokerName
    })
  },

  get: async (token: string, id: number): Promise<PortfolioInfo> => {
    const data = await httpClient.authGet(token, `${PORTFOLIOS_BASE}/${id}`)
    const account: PortfolioInfo = {
      id: data.id,
      name: data.name,
      accounts: data.accounts,
      userId: data.user_id
    }

    return account
  },

  update: async (token: string, id: number, payload: AccountPayload): Promise<PortfolioInfo> => {
    const updatePayload: any = {}
    payload.accountNo && (updatePayload.account_number = payload.accountNo)
    payload.brokerName && (updatePayload.broker_name = payload.brokerName)

    return await httpClient.authPut(token, `${PORTFOLIOS_BASE}/${id}`, updatePayload)
  },

  delete: async (token: string, id: number): Promise<void> => {
    return await httpClient.authDelete(token, `${PORTFOLIOS_BASE}/${id}`)
  }
}
