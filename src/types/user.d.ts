export interface User {
  id: int;
  email: string;
  username: string;
  active: boolean;
  firstName?: string;
  lastName?: string;
  company?: string;
  phoneNumber?: string;
}