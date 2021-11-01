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

export const useSelector = (selectorFn: UserStateSelector): any => {
	const value = useContext<UserStateStoreType>(UserContext);
	return selectorFn(value.state);
}

export const useDispatch = (): Dispatch<ActionType> => {
	const value = useContext<UserStateStoreType>(UserContext);
	return value.dispatch;
}

export const useAuthenticate = () => {
  const user = useSelector((state: UserState) => state.user)
  const dispatch = useDispatch()

  const signin = async (email: string, pass: string) => {
    const tokens = await AuthApis.signin(email, pass)
    const user = await UserApis.get(tokens.access_token)
    dispatch({
      type: AuthActions.setUser,
      payload: {
        user,
        token: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token
        }
      }
    })
  }

  const signup = async (email: string, username: string, pass: string) => {
    const user = await AuthApis.signup(email, username, pass)
    const tokens = await AuthApis.signin(email, pass)

    dispatch({
      type: AuthActions.setUser,
      payload: {
        user,
        token: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token
        }
      }
    })
  }

  const signout = async (token: string) => {
    await AuthApis.signout(token)
    dispatch({ type: AuthActions.clearUser })
  }

  const confirm = async (accessToken: string, confirmToken: string) => {
    await AuthApis.confirm(confirmToken)
    const user = await UserApis.get(accessToken)

    dispatch({
      type: AuthActions.setUser,
      payload: { user }
    })
  }

  const forgotPass = async (email: string) => {
    await AuthApis.forgotPassword(email)
  }

  const resetPass = async (token: string, pass: string) => {
    await AuthApis.resetPassword(token, pass)
  }

  return { 
    user, signin, signup, signout, confirm,
    forgotPass, resetPass
  }
}