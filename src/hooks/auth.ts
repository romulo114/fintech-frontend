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
  signin: (email: string, pass: string) => Promise<void>;
  signup: (email: string, username: string, pass: string) => Promise<void>;
  signout: (token: string) => Promise<void>;
  confirm: (accessToken: string, confirmToken: string) => Promise<void>;
  forgotPass: (email: string) => Promise<void>;
  resetPass: (token: string, pass: string) => Promise<void>;
}
export const useAuthenticate = (): AuthInterface => {
  const user = useSelector((state: UserState) => state.user)
  const dispatch = useDispatch()

  const signin = async (email: string, pass: string): Promise<void> => {
    const response = await AuthApis.signin(email, pass)
    dispatch({
      type: AuthActions.setUser,
      payload: {
        user: response.user,
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
        user: response.user,
        token: {
          accessToken: response.tokens.access_token,
          refreshToken: response.tokens.refresh_token
        }
      }
    })
  }

  const signout = async (token: string): Promise<void> => {
    await AuthApis.signout(token)
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
    user, signin, signup, signout, confirm,
    forgotPass, resetPass
  }
}