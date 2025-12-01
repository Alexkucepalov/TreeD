// Общие типы приложения
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

// API типы
export type ShopRegisterPayload = {
	nickname?: string;
	fio?: string;
	email: string;
	password: string;
	password_confirmation: string;
	role?: 'customer' | 'contractor' | 'admin';
	can_model?: boolean;
	can_print?: boolean;
	printing_experience?: 'under_1_year' | 'from_1_to_3_years' | 'over_3_years' | null;
	modeling_experience?: 'under_1_year' | 'from_1_to_3_years' | 'over_3_years' | null;
	cad_ids?: number[] | null;
	city_id?: number;
	printing_direction_ids?: number[] | null;
	modeling_direction_ids?: number[] | null;
	equipments?: Array<{
		count: number;
		colors: number | null;
		post_processing?: string | null;
		equipment_type_id: number;
		printing_area_id: number | null;
		material_ids: number[];
		direction?: string | null;
	}>;
};

export type ContractorValidationPayload = {
	can_model: boolean;
	can_print: boolean;
	printing_experience: 'under_1_year' | 'from_1_to_3_years' | 'over_3_years' | null;
	modeling_experience: 'under_1_year' | 'from_1_to_3_years' | 'over_3_years' | null;
	cad_ids: number[] | null;
	city_id: number;
	printing_direction_ids?: number[] | null;
	modeling_direction_ids?: number[] | null;
};

export type EquipmentValidationPayload = {
	count: number;
	colors: number | null;
	post_processing?: string | null;
	equipment_type_id: number;
	printing_area_id: number | null;
	material_ids: number[];
	direction?: string | null;
};

export type ShopProfile = {
	id: number;
	nickname: string;
	email: string;
	role?: string;
};


