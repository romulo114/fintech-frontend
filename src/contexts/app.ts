import { createContext, Dispatch, useContext, useEffect } from 'react'
import { StoreType, ActionType, PureAction } from './context'

export interface AppState {
	title: string;
}

type AppStateStoreType = StoreType<AppState>
export const initialState: AppStateStoreType = {
  state: {
		title: 'Fithm'
	},
	dispatch: (action: ActionType) => {}
}

export const AppStateContext = createContext<AppStateStoreType>(initialState)
type ReportCheckStatusSelector = (store: AppState) => any

export const useSelector = (selectorFn: ReportCheckStatusSelector): any => {
	const value = useContext<AppStateStoreType>(AppStateContext);
	return selectorFn(value.state);
}

export const useDispatch = (): Dispatch<ActionType> => {
	const value = useContext<AppStateStoreType>(AppStateContext);
	return value.dispatch;
}

export function reducer(state: AppState, action: PureAction): AppState {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        title: action.payload
      }
    default:
      return state
  }
}

export function useTitle(title: string): void {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'SET_TITLE',
      payload: title
    })
  }, [title, dispatch])
}