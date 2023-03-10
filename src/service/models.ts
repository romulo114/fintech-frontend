import { httpClient, BASE_URL } from './base'
import { ModelInfo, ModelPayload, ModelPositionUpdatePayload } from 'types/model'

const MODELS_BASE = `${BASE_URL}/models`

function map2Model(data: any): ModelInfo {
  const { is_public, positions, ...others } = data
  return {
    ...others,
    public: is_public,
    positions: positions?.map((pos: any ) => ({ ...pos, price: pos.price?.price }))
  }
}

export const ModelApis = {
  getAll: async (shared: boolean): Promise<ModelInfo[]> => {
    const { models } = await httpClient.authGet(`${MODELS_BASE}?public=${shared}`)
    return models.map(map2Model)
  },

  create: async (payload: ModelPayload): Promise<ModelInfo> => {
    const data = await httpClient.authPost(`${MODELS_BASE}`, payload)
    return map2Model(data)
  },

  get: async (id: number): Promise<ModelInfo> => {
    const data = await httpClient.authGet(`${MODELS_BASE}/${id}`)
    return map2Model(data)
  },

  update: async (id: number, payload: ModelPayload): Promise<ModelInfo> => {
    const data = await httpClient.authPut(`${MODELS_BASE}/${id}`, payload)
    return map2Model(data)
  },

  delete: async (id: number): Promise<void> => {
    await httpClient.authDelete(`${MODELS_BASE}/${id}`)
  },

  updatePositions: async (
    id: number, payload: ModelPositionUpdatePayload
  ): Promise<ModelInfo> => {
    const data = await httpClient.authPut(`${MODELS_BASE}/${id}/position`, payload)
    return map2Model(data)
  }
}
