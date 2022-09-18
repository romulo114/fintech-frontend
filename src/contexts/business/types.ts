import { BusinessPrice } from "types/business";

export type BusinessDataType = {
	prices: BusinessPrice[],
}

export type BusinessContextType = BusinessDataType & {
	loading: boolean,
	error: string,
	createPrice: (symbol: string, price: number) => Promise<void>,
	updatePrice: (id: number, symbol: string, price: number) => Promise<void>,
	deletePrice: (id: number) => Promise<void>
};
