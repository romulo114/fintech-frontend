import React, { createContext, useState, useCallback, PropsWithChildren } from 'react';
import { DialogContextType } from './types';

const initialState: DialogContextType = {
	open: false,
	onClose: () => { },
	openDialog: () => {},
	title: '',
	body: ''
}

export const DialogContext = createContext<DialogContextType | null>(null);

export const BusinessProvider = ({ children }: PropsWithChildren): JSX.Element => {
	const [data, setData] = useState<DialogContextType>(initialState);

	const onClose = useCallback(() => {
		setData((data: DialogContextType) => ({ ...data, open: false }));
	}, []);

	const openDialog = (title: string, body: React.ReactNode) => {
		setData((data: DialogContextType) => ({ ...data, open: true, onClose, title, body }));
	}

	return (
		<DialogContext.Provider value={{ ...data, openDialog }}>
			{children}
		</DialogContext.Provider>
	);
}
