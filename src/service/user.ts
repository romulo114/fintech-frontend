import { httpClient, BASE_URL } from './base'

const USER_BASE = `${BASE_URL}/users`

export type UpdatePayload = {
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  phone_number?: string;
  old_password?: string;
  new_password?: string;
}
export const UserApis = {
  get: async () => {
    return await httpClient.authGet(`${USER_BASE}`)
  },

  update: async (payload: UpdatePayload): Promise<any> => {
    return await httpClient.authPut(`${USER_BASE}`, payload)
  }
}
