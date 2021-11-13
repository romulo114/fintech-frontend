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
  get: async (token: string) => {
    return httpClient.authGet(token, `${USER_BASE}`)
  },

  update: async (
    token: string,
    payload: UpdatePayload
  ): Promise<any> => {
  
    return httpClient.authPut(token, `${USER_BASE}`, payload)
  }
}
