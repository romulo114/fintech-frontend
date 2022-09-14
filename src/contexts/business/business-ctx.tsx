import { createContext, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import { BusinessContextType, BusinessDataType } from './types';
import { BusinessApis } from 'service/business';

const initialState: BusinessDataType = {
	prices: [],
}

export const BusinessContext = createContext<BusinessContextType | null>(null);

export const BusinessProvider = ({ children }: PropsWithChildren): JSX.Element => {
	const [data, setData] = useState<BusinessDataType>(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchAll = async () => {
		const prices = await BusinessApis.getPrices()
		setData(data => ({ ...data, prices }));
	};

	useEffect(() => {
		const init = async () => {
			setLoading(true);
			try {
				await fetchAll();
			} catch (e: any) {
				setError(e.message ?? JSON.stringify(e));
			} finally {
				setLoading(false);
			}
		}

		init();
	}, []);

	const createPrice = useCallback(async (symbol: string, price: number) => {
		await BusinessApis.createPrice(symbol, price);
		await fetchAll()
	}, []);

	const updatePrice = useCallback(async (id: number, symbol: string, price: number) => {
		await BusinessApis.updatePrice(id, symbol, price);
		await fetchAll()
	}, []);

	const deletePrice = useCallback(async (id: number) => {
		await BusinessApis.deletePrice(id);
		await fetchAll();
	}, []);

	return (
		<BusinessContext.Provider
			value={{
				...data, loading, error,
				createPrice, updatePrice, deletePrice
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
}
