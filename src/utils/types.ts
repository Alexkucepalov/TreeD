export interface IOrder {
	_id: string;
	ingredients: string[];
	status: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
}

export interface IWsMessagePayload {
	success: boolean;
	orders: IOrder[];
	total: number;
	totalToday: number;
	message?: string;
}
