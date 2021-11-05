export interface User {
  id: number;
  email: string;
  username: string;
  active: boolean;
  firstName?: string;
  lastName?: string;
  company?: string;
  phoneNumber?: string;
}

export const DASHBOARD_URL = '/user/dashboard'