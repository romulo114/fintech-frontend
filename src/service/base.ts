import Axios from 'axios'
import { AuthActions } from 'contexts/auth'


class HttpClient {
  get = async (
    url: string,
    params: object = {},
    headers: object = {}
  ): Promise<any> => {
    const { data } = await Axios.get(url, { params, headers })
    return data
  }

  post = async (
    url: string,
    body: object,
    params: object = {},
    headers: object = {}
  ): Promise<any> => {
    const { data } = await Axios.post(url, body, { params, headers })
    return data
  }

  put = async (
    url: string,
    body: object,
    params: object = {},
    headers: object = {}
  ): Promise<any> => {
    const { data } = await Axios.put(url, body, { params, headers })
    return data
  }

  delete = async (
    url: string,
    params: object = {},
    headers: object = {}
  ): Promise<any> => {
    const { data } = await Axios.delete(url, { params, headers })
    return data
  }

  getWithToken = async (
    token: string,
    url: string,
    params: object = {}
  ): Promise<any> => {
    return await this.get(url, params, { Authorization: `Bearer ${token}` })
  }

  postWithToken = async (
    token: string,
    url: string,
    body: object = {},
    params: object = {}
  ): Promise<any> => {
    return await this.post(url, body, params, { Authorization: `Bearer ${token}` })
  }

  putWithToken = async (
    token: string,
    url: string,
    body: object = {},
    params: object = {}
  ): Promise<any> => {
    return await this.put(url, body, params, { Authorization: `Bearer ${token}` })
  }

  deleteWithToken = async (
    token: string,
    url: string,
    params: object = {}
  ): Promise<any> => {
    return await this.delete(url, params, { Authorization: `Bearer ${token}` })
  }
}

class AuthClient extends HttpClient {

  private _accessToken: string = ''
  private _refreshToken: string = ''
  private _authHandler: any = null
  private _dispatch: CallableFunction | null = null

  static instance: AuthClient | null = null
  public static getInstance(): AuthClient {
    if (!AuthClient.instance) {
      AuthClient.instance = new AuthClient()
    }

    return AuthClient.instance
  }

  private constructor() { super() }

  set accessToken(token: string) {
    this._accessToken = token
  }

  get accessToken(): string {
    return this._accessToken
  }

  set refreshToken(token: string) {
    this._refreshToken = token
  }

  get refreshToken(): string {
    return this._refreshToken
  }

  refreshHandler = async (error: any): Promise<any> => {
    const orgRequest = error.config
    const response = error.response

    if (!response) return Promise.reject(error)

    let msg = response.data?.message
    if (typeof msg === 'string' && msg.includes('message')) {
      msg = JSON.parse(msg).message
    }

    if (error.response.status === 401 && msg.includes('expired') && !orgRequest._retry) {
      console.log(orgRequest.url)
      if (orgRequest.url.indexOf('/auth/refresh') >= 0) {
        if (this._dispatch) {
          this._dispatch({ type: AuthActions.clearUser })
        }

        return Promise.reject(new Error('Session expired. Please sign in again.'))
      }

      orgRequest._retry = true

      const { tokens } = await this._authHandler.refresh(this._refreshToken)
      if (!tokens.access_token) {
        throw new Error('Token refresh failed')
      }

      this.accessToken = tokens.access_token
      this.refreshToken = tokens.refresh_token
      if (this._dispatch) {
        this._dispatch({
          type: AuthActions.setUser,
          payload: { token: {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
          } }
        })
      }
      orgRequest.headers['Authorization'] = 'Bearer ' + this.accessToken
      return Axios(orgRequest)
    }

    throw new Error(`${response.status} ${msg ?? response.statusText}`)
  }

  init = (handler: any, dispatch: CallableFunction): void => {
    this._authHandler = handler
    this._dispatch = dispatch
    Axios.interceptors.response.use(undefined, this.refreshHandler)
  }

  authGet = async (url: string, params: object = {}): Promise<any> => {
    return await this.getWithToken(this._accessToken, url, params)
  }

  authPost = async (
    url: string, body: object = {}, params: object = {}
  ): Promise<any> => {
    return await this.postWithToken(this._accessToken, url, body, params)
  }

  authPut = async (
    url: string, body: object = {}, params: object = {}
  ): Promise<any> => {
    return await this.putWithToken(this._accessToken, url, body, params)
  }

  authDelete = async (
    url: string, params: object = {}
  ): Promise<any> => {
    return await this.deleteWithToken(this._accessToken, url, params)
  }
}

export const httpClient = AuthClient.getInstance()
export const BASE_URL = 'http://localhost:5000/api/v1'
