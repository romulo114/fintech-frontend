import { httpClient, BASE_URL } from './base'

const AUTH_BASE = `${BASE_URL}/auth`

export const AuthApis = {
  signin: async (email: string, password: string) => {
    return await httpClient.post(`${AUTH_BASE}/signin`, { email, password })
  },

  signup: async (email: string, username: string, password: string) => {
    return await httpClient.post(`${AUTH_BASE}/signup`, { email, username, password })
  },

  signout: async (token: string) => {
    return await httpClient.authPost(token, `${AUTH_BASE}/signout`)
  },

  confirm: async (token: string) => {
    return await httpClient.post(`${AUTH_BASE}/confirm-email`, {
      confirm_token: token
    })
  },

  sendConfirm: async (token: string) => {
    return await httpClient.authGet(token, `${AUTH_BASE}/send-confirm`)
  },

  forgotPassword: async (email: string) => {
    return await httpClient.post(`${AUTH_BASE}/forgot-password`, { email })
  },

  resetPassword: async (reset_token: string, password: string) => {
    return await httpClient.post(`${AUTH_BASE}/reset-password`, {
      reset_token,
      password
    })
  }
}
