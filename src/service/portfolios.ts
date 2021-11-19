import { httpClient, BASE_URL } from './base'
import { PortfolioInfo } from 'types/portfolio'
import { map2Account } from './accounts'

const PORTFOLIOS_BASE = `${BASE_URL}/portfolios`

export type PortfolioPayload = {
  name: string;
}
export type UpdateAccountsPayload = {
  accounts: number[];
}
export type UpdateModelPayload = {
  model_id: number;
}
export const PortfolioApis = {
  getAll: async (token: string): Promise<PortfolioInfo[]> => {
    const { portfolios } = await httpClient.authGet(token, `${PORTFOLIOS_BASE}`)
    return portfolios.map((item: any) => ({
      ...item,
      accounts: item.accounts.map(map2Account)
    }))
  },

  create: async (token: string, payload: PortfolioPayload): Promise<PortfolioInfo[]> => {
    return await httpClient.authPost(token, `${PORTFOLIOS_BASE}`, payload)
  },

  get: async (token: string, id: number): Promise<PortfolioInfo> => {
    const data = await httpClient.authGet(token, `${PORTFOLIOS_BASE}/${id}`)
    const portfolio: PortfolioInfo = {
      ...data,
      accounts: data.accounts.map(map2Account)
    }

    return portfolio
  },

  update: async (
    token: string, id: number, payload: PortfolioPayload
  ): Promise<PortfolioInfo> => {
    const data = await httpClient.authPut(token, `${PORTFOLIOS_BASE}/${id}`, payload)
    return { ...data, accounts: data.accounts.map(map2Account) }
  },

  updateAccounts: async (
    token: string, id: number, payload: UpdateAccountsPayload
  ): Promise<PortfolioInfo> => {
    const data = await httpClient.authPut(token, `${PORTFOLIOS_BASE}/${id}/accounts`, payload)
    return { ...data, accounts: data.accounts.map(map2Account) }
  },

  updateModel: async (
    token: string, id: number, payload: UpdateModelPayload
  ): Promise<PortfolioInfo> => {
    const data = await httpClient.authPut(token, `${PORTFOLIOS_BASE}/${id}/model`, payload)
    return { ...data, accounts: data.accounts.map(map2Account) }
  },

  delete: async (token: string, id: number): Promise<void> => {
    return await httpClient.authDelete(token, `${PORTFOLIOS_BASE}/${id}`)
  }
}
