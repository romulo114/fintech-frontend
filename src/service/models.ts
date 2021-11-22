import { httpClient, BASE_URL } from './base'
import { ModelInfo, ModelPayload, ModelPositionPayload } from 'types/model'

const MODELS_BASE = `${BASE_URL}/models`

function map2Model(data: any): ModelInfo {
  const { is_public, ...others } = data
  return {
    ...others,
    public: is_public
  }
}

export const ModelApis = {
  getAll: async (token: string, shared: boolean): Promise<ModelInfo[]> => {
    const { models } = await httpClient.authGet(token, `${MODELS_BASE}?public=${shared}`)
    return models.map(map2Model)
  },

  create: async (token: string, payload: ModelPayload): Promise<ModelInfo> => {
    const data = await httpClient.authPost(token, `${MODELS_BASE}`, payload)
    return map2Model(data)
  },

  get: async (token: string, id: number): Promise<ModelInfo> => {
    const data = await httpClient.authGet(token, `${MODELS_BASE}/${id}`)
    return map2Model(data)
  },

  update: async (token: string, id: number, payload: ModelPayload): Promise<ModelInfo> => {
    const data = await httpClient.authPut(token, `${MODELS_BASE}/${id}`, payload)
    return map2Model(data)
  },

  delete: async (token: string, id: number): Promise<void> => {
    await httpClient.authDelete(token, `${MODELS_BASE}/${id}`)
  },

  updatePositions: async (
    token: string, id: number, payload: ModelPositionPayload
  ): Promise<ModelInfo> => {
    const data = await httpClient.authPut(token, `${MODELS_BASE}/${id}/position`, payload)
    return map2Model(data)
  }
}
