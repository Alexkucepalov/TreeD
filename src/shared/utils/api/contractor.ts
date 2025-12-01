// API функции для регистрации мастеров
import { makeRequest, SHOP_AUTH_BASE_URL } from './common';
import type { ContractorValidationPayload, EquipmentValidationPayload } from '@shared/types';

/**
 * Валидация информации о мастере
 */
export const validateContractor = async (payload: ContractorValidationPayload): Promise<void> => {
	await makeRequest(`${SHOP_AUTH_BASE_URL}/register/validate-contractor`, {
		method: 'POST',
		body: payload,
		ensureCsrf: true,
	});
};

/**
 * Валидация информации об оборудовании
 */
export const validateEquipment = async (payload: EquipmentValidationPayload): Promise<void> => {
	await makeRequest(`${SHOP_AUTH_BASE_URL}/register/validate-equipment`, {
		method: 'POST',
		body: payload,
		ensureCsrf: true,
	});
};


