import { createContext, Dispatch, useContext, useEffect } from 'react'
import { StoreType, ActionType, PureAction } from './context'
import { User } from 'types/user'

export const AuthActions = {
  setUser: 'SET_USER',
  clearUser: 'CLEAR_USER'
}

export interface UserState {
  user: User | null;
  token: {
    accessToken: string;
    refreshToken: string;
  } | null;
}

export type UserStateStoreType = StoreType<UserState>

export function saveState(state: UserState): void {
  localStorage.setItem('auth', JSON.stringify(state))
}

function loadState(): UserState | null {
  const state = localStorage.getItem('auth')
  if (!state) {
    return null
  }

  return JSON.parse(state)
}

const savedState = loadState()
export const initialState: UserStateStoreType = {
  state: savedState ?? {
    user: null,
    token: null
  },
  dispatch: (action: ActionType) => { }
}

export const UserContext = createContext<UserStateStoreType>(initialState)
export type UserStateSelector = (store: UserState) => any

export function reducer(state: UserState, action: PureAction): UserState {
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
