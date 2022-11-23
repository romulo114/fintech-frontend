import { useEffect, useCallback, useContext } from 'react';
import { Transition, Blocker } from 'history';
import { RouterContext } from 'containers/router';

export function useBlocker(blocker: Blocker, when = true) {
	const { history } = useContext(RouterContext);

	useEffect(() => {
		if (!when || !history) return;

		const unblock = history.block((tx: Transition) => {
			console.log('leaving page ...');
			const autoUnblockingTx = {
				...tx,
				retry() {
					unblock();
					tx.retry();
				},
			};

			blocker(autoUnblockingTx);
		});

		return unblock;
	}, [history, blocker, when]);
}
/**
 * Prompts the user with an Alert before they leave the current screen.
 *
 * @param  message
 * @param  when
 */
export function usePrompt(message: string, when = true) {
	const blocker = useCallback((tx: Transition) => {
		if (window.confirm(message)) tx.retry();
	}, [message]);

	useBlocker(blocker, when);
}