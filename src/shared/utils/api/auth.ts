// API функции для аутентификации
import { makeRequest, ensureShopCsrfCookie, createHeaders, handleFetchError, SHOP_AUTH_BASE_URL } from './common';
import type { ShopRegisterPayload } from '@shared/types';

/**
 * Регистрация нового аккаунта
 */
export const registerShopAccount = async (payload: ShopRegisterPayload) => {
	return makeRequest(`${SHOP_AUTH_BASE_URL}/register`, {
		method: 'POST',
		body: payload,
		ensureCsrf: true,
	});
};

/**
 * Авторизация пользователя
 */
export const loginShopAccount = async (email: string, password: string) => {
	await ensureShopCsrfCookie();

	const headers = createHeaders({
		includeContentType: true,
		includeXRequestedWith: true,
	});
	
	// Добавляем Origin для Laravel Sanctum
	(headers as any)['Origin'] = window.location.origin;

	const url = `${SHOP_AUTH_BASE_URL}/login`;
	
	let response: Response;
	try {
		response = await fetch(url, {
			method: 'POST',
			headers,
			credentials: 'include',
			body: JSON.stringify({ email, password }),
			redirect: 'manual',
		});
	} catch (fetchError: any) {
		handleFetchError(fetchError, url);
		// Эта строка никогда не выполнится, но нужна для TypeScript
		throw fetchError;
	}

	// Обработка ошибки 419 (CSRF токен)
	if (response.status === 419) {
		await ensureShopCsrfCookie();
		const retryHeaders = createHeaders({
			includeContentType: true,
			includeXRequestedWith: true,
		});
		
		const retryResponse = await fetch(url, {
			method: 'POST',
			headers: retryHeaders,
			credentials: 'include',
			body: JSON.stringify({ email, password }),
			redirect: 'manual',
		});

		if (retryResponse.ok || retryResponse.status === 204) {
			localStorage.setItem('accessToken', 'session-token');
			return {
				ok: true,
				user: { id: 0, nickname: email, email: email, needsProfileFetch: true },
				accessToken: 'session-token',
			};
		}

		const errorText = await response.text().catch(() => '');
		throw new Error(`Ошибка CSRF токена (419). ${errorText ? `Ответ сервера: ${errorText}` : ''}`);
	}

	// Успешный ответ
	const contentType = response.headers.get('content-type') || '';
	if (
		response.ok && (contentType.includes('text/html') || contentType.includes('application/json')) ||
		response.status === 302 ||
		response.type === 'opaqueredirect'
	) {
		localStorage.setItem('accessToken', 'session-token');
		return {
			ok: true,
			user: { id: 0, nickname: email, email: email, needsProfileFetch: true },
			accessToken: 'session-token',
		};
	}

	// Обработка ошибок
	if (!response.ok) {
		let body: any = null;
		try {
			body = await response.json();
		} catch (_) {
			body = await response.text().catch(() => null);
		}

		const message = (body && body.message) ? body.message : `Ошибка входа ${response.status}`;
		throw Object.assign(new Error(message), { status: response.status, details: body });
	}

	// Парсим успешный ответ
	let body: any = null;
	try {
		body = await response.json();
	} catch (_) {
		body = await response.text().catch(() => null);
	}

	return body ?? { ok: true };
};

/**
 * Выход из системы
 */
export const logoutUserGet = async () => {
	try {
		await makeRequest(`${SHOP_AUTH_BASE_URL}/logout`, {
			method: 'GET',
			ensureCsrf: true,
		});
		return { ok: true };
	} catch (error) {
		// Logout request failed, but continuing with local cleanup
		return { ok: true };
	}
};


