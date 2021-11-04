import React, { Dispatch, PropsWithChildren } from 'react'
import { initialState, UserContext, reducer, saveState } from 'contexts/auth'
import { ActionType, useReducerWithSubscriber } from 'contexts/context'

export const WithAuth: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { state, dispatch } = useReducerWithSubscriber(reducer, initialState.state, [saveState])
  return (
    <UserContext.Provider value={{ state, dispatch: dispatch as Dispatch<ActionType> }}>
      {children}
    </UserContext.Provider>
  )
}
