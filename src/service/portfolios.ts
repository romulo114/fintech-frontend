import { httpClient, BASE_URL } from './base'
import { PortfolioInfo } from 'types/portfolio'

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
      id: item.id,
      name: item.name,
      accounts: item.accounts,
      model: item.model
    }))
  },

  create: async (token: string, payload: PortfolioPayload): Promise<PortfolioInfo[]> => {
    return await httpClient.authPost(token, `${PORTFOLIOS_BASE}`, payload)
  },

  get: async (token: string, id: number): Promise<PortfolioInfo> => {
    const data = await httpClient.authGet(token, `${PORTFOLIOS_BASE}/${id}`)
    const portfolio: PortfolioInfo = {
      id: data.id,
      name: data.name,
      accounts: data.accounts,
      model: data.model
    }

    return portfolio
  },

  update: async (
    token: string, id: number, payload: PortfolioPayload
  ): Promise<PortfolioInfo> => {
    return await httpClient.authPut(token, `${PORTFOLIOS_BASE}/${id}`, payload)
  },

  updateAccounts: async (
    token: string, id: number, payload: UpdateAccountsPayload
  ): Promise<PortfolioInfo> => {
    return await httpClient.authPut(token, `${PORTFOLIOS_BASE}/${id}/accounts`, payload)
  },

  updateModel: async (
    token: string, id: number, payload: UpdateModelPayload
  ): Promise<PortfolioInfo> => {
    return await httpClient.authPut(token, `${PORTFOLIOS_BASE}/${id}/model`, payload)
  },

  delete: async (token: string, id: number): Promise<void> => {
    return await httpClient.authDelete(token, `${PORTFOLIOS_BASE}/${id}`)
  }
}
