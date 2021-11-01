import React, { Dispatch, PropsWithChildren, useReducer } from 'react'
import { initialState, UserContext, reducer } from 'contexts/auth'
import { ActionType } from 'contexts/context'

export const WithAuth: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState.state)
  return (
    <UserContext.Provider value={{ state, dispatch: dispatch as Dispatch<ActionType> }}>
      {children}
    </UserContext.Provider>
  )
}
