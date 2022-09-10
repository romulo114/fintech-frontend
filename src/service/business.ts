import { httpClient, BASE_URL } from './base';
import { BusinessPrice } from 'types/business';

const BUSINESS_BASE = `${BASE_URL}/business`;

function mapPrice(price: any): BusinessPrice {
	return {
		id: price.id,
		symbol: price.symbol,
		price: price.price,
		accountPositions: price.account_positions
	}
}

export const BusinessApis = {
	getPrices: async (): Promise<BusinessPrice[]> => {
		const { prices } = await httpClient.authGet(`${BUSINESS_BASE}/prices`);
		return prices.map(mapPrice);
	},

	createPrice: async (symbol: string, price: number): Promise<BusinessPrice> => {
		const result = await httpClient.authPost(
			`${BUSINESS_BASE}/prices`,
			{ symbol, price }
		);
		return mapPrice(result);
	},

	updatePrice: async (id: number, symbol: string, price: number): Promise<BusinessPrice> => {
		const result = await httpClient.authPut(
			`${BUSINESS_BASE}/prices/${id}`,
			{ symbol, price }
		);
		return mapPrice(result);
	},

	deletePrice: async (id: number): Promise<void> => {
		return await httpClient.authDelete(`${BUSINESS_BASE}/prices/${id}`);
	}
};
