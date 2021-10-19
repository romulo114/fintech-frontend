import { httpClient, BASE_URL } from './base'

const AUTH_BASE = `${BASE_URL}/auth`

export const authenticator = {
  signin: async (email: string, password: string) => {
    return httpClient.post(`${AUTH_BASE}/signin`, { email, password })
  },

  signup: async (email: string, username: string, password: string) => {
    return httpClient.post(`${AUTH_BASE}/signin`, { email, username, password })
  }
}
