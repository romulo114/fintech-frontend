import Axios from 'axios'

class HttpClient {

  private _accessToken: string = ''
  private _refreshToken: string = ''

  static instance: HttpClient | null = null
  public static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient()
    }

    return HttpClient.instance
  }

  private constructor() { }

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

  authGet = async (
    token: string,
    url: string,
    params: object = {}
  ): Promise<any> => {
    return await this.get(url, params, { Authorization: `Bearer ${token}` })
  }

  authPost = async (
    token: string,
    url: string,
    body: object = {},
    params: object = {}
  ): Promise<any> => {
    return await this.post(url, body, params, { Authorization: `Bearer ${token}` })
  }

  authPut = async (
    token: string,
    url: string,
    body: object = {},
    params: object = {}
  ): Promise<any> => {
    return await this.put(url, body, params, { Authorization: `Bearer ${token}` })
  }

  authDelete = async (
    token: string,
    url: string,
    params: object = {}
  ): Promise<any> => {
    return await this.delete(url, params, { Authorization: `Bearer ${token}` })
  }
}

export const httpClient = HttpClient.getInstance()
export const BASE_URL = 'http://localhost:5000/api/v1'
