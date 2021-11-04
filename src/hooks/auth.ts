import { useContext, Dispatch } from 'react'
import {
  AuthActions,
  UserContext,
  UserStateSelector,
  UserStateStoreType,
  UserState
} from 'contexts/auth'
import { ActionType } from 'contexts/context'
import { AuthApis, UserApis } from 'service'
import { User } from 'types/user'

export const useSelector = (selectorFn: UserStateSelector): any => {
  const value = useContext<UserStateStoreType>(UserContext);
  return selectorFn(value.state);
}

export const useDispatch = (): Dispatch<ActionType> => {
  const value = useContext<UserStateStoreType>(UserContext);
  return value.dispatch;
}

interface AuthInterface {
  user: User | null;
  tokens: { accessToken: string, refreshToken: string } | null;
  signin: (email: string, pass: string) => Promise<void>;
  signup: (email: string, username: string, pass: string) => Promise<void>;
  signout: (token?: string) => Promise<void>;
  confirm: (accessToken: string, confirmToken: string) => Promise<void>;
  forgotPass: (email: string) => Promise<void>;
  resetPass: (token: string, pass: string) => Promise<void>;
}
export const useAuthenticate = (): AuthInterface => {
  const user = useSelector((state: UserState) => state.user)
  const tokens = useSelector((state: UserState) => state.token)
  const dispatch = useDispatch()

  const signin = async (email: string, pass: string): Promise<void> => {
    const response = await AuthApis.signin(email, pass)
    dispatch({
      type: AuthActions.setUser,
      payload: {
        user: {
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          active: response.user.active,
          firstName: response.user.first_name,
          lastName: response.user.last_name,
          company: response.user.company,
          phoneNumber: response.user.phone_number,
        },
        token: {
          accessToken: response.tokens.access_token,
          refreshToken: response.tokens.refresh_token
        }
      }
    })
  }

  const signup = async (email: string, username: string, pass: string): Promise<void> => {
    await AuthApis.signup(email, username, pass)
    const response = await AuthApis.signin(email, pass)

    dispatch({
      type: AuthActions.setUser,
      payload: {
        user: {
          id: response.user.id,
          username: response.user.username,
          email: response.user.email,
          active: response.user.active,
          firstName: response.user.first_name,
          lastName: response.user.last_name,
          company: response.user.company,
          phoneNumber: response.user.phone_number,
        },
        token: {
          accessToken: response.tokens.access_token,
          refreshToken: response.tokens.refresh_token
        }
      }
    })
  }

  const signout = async (token?: string): Promise<void> => {
    await AuthApis.signout(token ?? tokens.accessToken)
    dispatch({ type: AuthActions.clearUser })
  }

  const confirm = async (accessToken: string, confirmToken: string): Promise<void> => {
    await AuthApis.confirm(confirmToken)
    const user = await UserApis.get(accessToken)

    dispatch({
      type: AuthActions.setUser,
      payload: { user }
    })
  }

  const forgotPass = async (email: string): Promise<void> => {
    await AuthApis.forgotPassword(email)
  }

  const resetPass = async (token: string, pass: string): Promise<void> => {
    await AuthApis.resetPassword(token, pass)
  }

  return {
    user, tokens, signin, signup, signout, confirm,
    forgotPass, resetPass
  }
}