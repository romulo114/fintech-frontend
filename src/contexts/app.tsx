import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
  PropsWithChildren
} from 'react';
import { StoreType, ActionType, PureAction } from './context';

export interface AppState {
  title: string;
}

type AppStateStoreType = StoreType<AppState>;
const initialState: AppStateStoreType = {
  state: {
    title: 'Fithm'
  },
  dispatch: (_: ActionType) => { }
};

export const AppStateContext = createContext<AppStateStoreType>(initialState);
type ReportCheckStatusSelector = (_: AppState) => any;

export const useSelector = (selectorFn: ReportCheckStatusSelector): any => {
  const value = useContext<AppStateStoreType>(AppStateContext);
  return selectorFn(value.state);
};

export const useDispatch = (): Dispatch<ActionType> => {
  const value = useContext<AppStateStoreType>(AppStateContext);
  return value.dispatch;
};

export function appReducer(state: AppState, action: PureAction): AppState {
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'SET_TITLE',
      payload: title
    });
  }, [title, dispatch])
}

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appReducer, initialState.state)
  return (
    <AppStateContext.Provider value={{ state, dispatch: dispatch as Dispatch<ActionType> }}>
      {children}
    </AppStateContext.Provider>
  )
};
