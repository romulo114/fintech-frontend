import { httpClient, BASE_URL } from './base'

const USER_BASE = `${BASE_URL}/users`

export const UserApis = {
  get: async (token: string) => {
    return httpClient.authGet(token, `${USER_BASE}`)
  },

  update: async (
    token: string,
    fName?: string,
    lName?: string,
    company?: string,
    phone?: string
  ): Promise<any> => {
    const body: any = {}
    if (fName) body.first_name = fName
    if (lName) body.last_name = lName
    if (company) body.compay = company
    if (phone) body.phone = phone
  
    return httpClient.authPut(token, `${USER_BASE}`, body)
  }
}
