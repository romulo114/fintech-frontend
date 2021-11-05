import React, { Dispatch, PropsWithChildren, useReducer } from 'react'
import { initialState, AppStateContext, reducer } from 'contexts/app'
import { ActionType } from 'contexts/context'

export const WithApp: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState.state)
  return (
    <AppStateContext.Provider value={{ state, dispatch: dispatch as Dispatch<ActionType> }}>
      {children}
    </AppStateContext.Provider>
  )
}
