import { httpClient, BASE_URL } from './base'
import { TradeInfo, AccountPositionInfo, PriceInfo } from 'types'
const TRADE_BASE = `${BASE_URL}/trades`

function map2Trade(data: any): TradeInfo {
  const trade: TradeInfo = {
    id: data.id,
    name: data.name,
    created: new Date(data.created).toLocaleTimeString(),
    status: data.status === 'true',
    portfolios: data.portfolios
  }

  return trade
}
type TradePayload = {
  name: string;
}
type UpdateTradePayload = {
  status: boolean;
  name: string;
}
type UpdatePortfoliosPayload = {
  portfolios: number[];
}
type UpdatePositionsPayload = {
  positions: number[];
}
type UpdatePricePayload = {
  iex: boolean;
  prices?: number[];
}
export const TradeApis = {
  getAll: async (): Promise<TradeInfo[]> => {
    const { trades } = await httpClient.authGet(`${TRADE_BASE}`)
  
    return trades.map(map2Trade)
  },

  create: async (payload: TradePayload): Promise<TradeInfo> => {
    const data = await httpClient.authPost(`${TRADE_BASE}`, payload)

    return map2Trade(data)
  },

  get: async (id: number): Promise<TradeInfo> => {
    const data = await httpClient.authGet(`${TRADE_BASE}/${id}`)

    console.log('detail: ', data)
    return map2Trade(data)
  },

  delete: async (id: number): Promise<void> => {
    return await httpClient.authDelete(`${TRADE_BASE}/${id}`)
  },

  update: async (id: number, payload: UpdateTradePayload): Promise<TradeInfo> => {
    const data = await httpClient.authPut(`${TRADE_BASE}/${id}`, payload)

    console.log('update: ', data)
    return map2Trade(data)
  },

  updatePortfolios: async (
    id: number, payload: UpdatePortfoliosPayload
  ): Promise<TradeInfo> => {
    const data = await httpClient.authPut(`${TRADE_BASE}/${id}/portfolios`, payload)

    console.log('updatePortfolios: ', data)
    return map2Trade(data)
  },

  getPositions: async (id: number, portfolioId?: number): Promise<AccountPositionInfo[]> => {
    const payload: any = {}
    if (portfolioId) {
      payload.portfolio_id = portfolioId
    }
    const data = await httpClient.authGet(`${TRADE_BASE}/${id}/positions`, payload)

    console.log('getPositions: ', data)
    return data
  },

  updatePositions: async (id: number, positions: number[]): Promise<TradeInfo> => {
    const data = await httpClient.authPut(`${TRADE_BASE}/${id}/positions`, { positions })
    
    console.log('updatePositions: ', data)
    return map2Trade(data)
  },

  getPrices: async (id: number): Promise<PriceInfo[]> => {
    const data = await httpClient.authGet(`${TRADE_BASE}/${id}/prices`)
    
    console.log('getPrices: ', data)
    return data
  },

  updatePrices: async (id: number, payload: UpdatePricePayload): Promise<TradeInfo> => {
    const data = await httpClient.authPost(`${TRADE_BASE}/${id}/prices`, payload)
        
    console.log('updatePrices: ', data)
    return map2Trade(data)
  }
}
