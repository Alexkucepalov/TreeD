// API функции для профиля
import { makeRequest, SHOP_API_BASE_URL } from './common';
import type { ShopProfile } from '@shared/types';

/**
 * Получение профиля пользователя
 */
export const fetchShopProfile = async (): Promise<ShopProfile> => {
	try {
		const data = await makeRequest<{ data?: ShopProfile } | ShopProfile>(`${SHOP_API_BASE_URL}/profile`, {
			method: 'GET',
			ensureCsrf: true,
		});

		return (data as any)?.data ?? data;
	} catch (error: any) {
		if (error.status === 401) {
			throw new Error('Не авторизован (401)');
		}
		if (error.status === 404) {
			throw new Error('Эндпоинт профиля не найден на сервере. Возможно, он еще не реализован.');
		}
		if (error.status === 500) {
			throw new Error('Ошибка сервера при получении профиля (500). Попробуйте позже или обратитесь в поддержку.');
		}
		throw error;
	}
};

/**
 * Обновление профиля пользователя
 */
export const updateShopProfile = async (payload: { email: string; nickname: string; password?: string }): Promise<ShopProfile> => {
	const data = await makeRequest<{ data?: ShopProfile } | ShopProfile>(`${SHOP_API_BASE_URL}/profile`, {
		method: 'PATCH',
		body: payload,
		ensureCsrf: true,
	});

	return (data as any)?.data ?? data;
};


