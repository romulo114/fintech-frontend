import { Dispatch, useReducer, useEffect, Reducer } from 'react'

export type PureAction = {
	type: string;
	payload?: any;
}
export type ActionType = PureAction | CallableFunction

export interface StoreType<StateType> {
	state: StateType;
	dispatch: Dispatch<ActionType>;
}

export type Middleware = (dispatch: CallableFunction, action: ActionType) => void

export type Subscriber<S> = (state: S) => void;

export function useReducerWithSubscriber<S, A>(
	reducer: Reducer<S, A>,
	initialState: S,
	subscribers: Subscriber<S>[]
): { state: S, dispatch: Dispatch<A> } {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		for (const subscriber of subscribers) {
			subscriber(state)
		}
	}, [state, subscribers])

	return { state, dispatch }
}
