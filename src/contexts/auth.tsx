import { createContext, Dispatch,PropsWithChildren } from 'react';
import { StoreType, ActionType, PureAction, useReducerWithSubscriber } from './context';
import { User } from 'types/user';

export const AuthActions = {
  setUser: 'SET_USER',
  clearUser: 'CLEAR_USER'
};

export interface UserState {
  user: User | null;
  token: {
    accessToken: string;
    refreshToken: string;
  } | null;
}

export type UserStateStoreType = StoreType<UserState>;

export function saveState(state: UserState): void {
  localStorage.setItem('auth', JSON.stringify(state));
}

function loadState(): UserState | null {
  const state = localStorage.getItem('auth');
  if (!state) {
    return null;
  }

  return JSON.parse(state)
}

const savedState = loadState();
const initialState: UserStateStoreType = {
  state: savedState ?? {
    user: null,
    token: null
  },
  dispatch: (_: ActionType) => { }
};

export const UserContext = createContext<UserStateStoreType>(initialState);
export type UserStateSelector = (store: UserState) => any;

export function authReducer(state: UserState, action: PureAction): UserState {
  switch (action.type) {
    case AuthActions.setUser:
      return {
        ...state,
        ...action.payload
      }
    case AuthActions.clearUser:
      return {
        ...state,
        user: null,
        token: null
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { state, dispatch } = useReducerWithSubscriber(authReducer, initialState.state, [saveState])
  return (
    <UserContext.Provider value={{ state, dispatch: dispatch as Dispatch<ActionType> }}>
      {children}
    </UserContext.Provider>
  )
};

