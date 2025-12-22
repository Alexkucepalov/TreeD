// API функции для получения данных
import { makeRequest, parseArrayResponse, SHOP_API_BASE_URL } from './common';

/**
 * Универсальная функция для получения списков данных
 */
const fetchList = async <T>(endpoint: string): Promise<T[]> => {
	try {
		const data = await makeRequest<any>(`${SHOP_API_BASE_URL}${endpoint}`, {
			method: 'GET',
			ensureCsrf: false,
		});

		return parseArrayResponse<T>(data);
	} catch (error: any) {
		if (error.status === 404) {
			return [];
		}
		throw error;
	}
};

/**
 * Получение направлений моделирования
 */
export const fetchModelingDirections = async (): Promise<Array<{id: number, name: string}>> => {
	return fetchList<{id: number, name: string}>('/modeling-directions');
};

/**
 * Получение CAD систем
 */
export const fetchCads = async (): Promise<Array<{id: number, name: string}>> => {
	return fetchList<{id: number, name: string}>('/cads');
};

/**
 * Получение типов оборудования
 */
export const fetchEquipmentTypes = async (): Promise<Array<{id: number, type: string}>> => {
	return fetchList<{id: number, type: string}>('/equipment-types');
};

/**
 * Получение материалов
 */
export const fetchMaterials = async (): Promise<Array<{id: number, name: string}>> => {
	return fetchList<{id: number, name: string}>('/materials');
};

/**
 * Получение областей печати
 */
export const fetchPrintingAreas = async (): Promise<Array<{id: number, area: string}>> => {
	return fetchList<{id: number, area: string}>('/printing-areas');
};

/**
 * Получение опыта моделирования
 */
export const fetchModelingExperience = async (): Promise<Array<{value: string, label: string}>> => {
	return fetchList<{value: string, label: string}>('/modeling-experience');
};

/**
 * Получение опыта печати
 */
export const fetchPrintingExperience = async (): Promise<Array<{value: string, label: string}>> => {
	return fetchList<{value: string, label: string}>('/printing-experience');
};

/**
 * Получение городов
 */
export const fetchCities = async (): Promise<Array<{id: number, name: string}>> => {
	return fetchList<{id: number, name: string}>('/cities');
};

/**
 * Получение направлений для универсала
 */
export const fetchUniversalDirections = async (): Promise<Array<{id: number, name: string}>> => {
	return fetchList<{id: number, name: string}>('/universal-directions');
};

/**
 * Получение направлений печати
 */
export const fetchPrintingDirections = async (): Promise<Array<{id: number, name: string}>> => {
	return fetchList<{id: number, name: string}>('/printing-directions');
};


