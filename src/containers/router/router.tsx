import {
  useRef,
  useState,
  useLayoutEffect,
  createElement,
  useContext,
  createContext,
  PropsWithChildren
} from 'react';
import { BrowserRouterProps, Router } from 'react-router-dom';
import { createBrowserHistory, BrowserHistory } from 'history';

export interface RouterState {
  history: BrowserHistory | null;
}

export const RouterContext = createContext<RouterState>({
  history: null
});

export function BrowserRouter({ basename, children }: BrowserRouterProps) {
  const { history } = useContext(RouterContext);
  if (!history) {
    throw new Error('BrowserRouter should be placed inside the Router context');
  }
  
  let [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  useLayoutEffect(() => history.listen(setState), [history]);
  // eslint-disable-next-line react/no-children-prop
  return /*#__PURE__*/createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}

export const RouterProvider = ({ children }: PropsWithChildren) => {
  let historyRef = useRef<BrowserHistory>();

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }

  const history = historyRef.current;
  return (
    <RouterContext.Provider value={{ history }}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </RouterContext.Provider>
  )
};
