// Бэкенд 3D-шоп (опубликованный на https://treed.pro)
// В dev режиме используем относительный путь через webpack proxy для обхода CORS
// В production используем прямой URL
const isProduction = typeof window === 'undefined' 
	? (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production')
	: (window.location.hostname === 'treed.pro' || window.location.hostname.includes('treed.pro'));

// Базовый URL для API эндпоинтов (с /api префиксом)
const SHOP_API_BASE_URL = isProduction ? 'https://treed.pro/api' : '/api';

// Базовый URL для аутентификации (без /api префикса)
const SHOP_AUTH_BASE_URL = isProduction ? 'https://treed.pro' : '';

// Логирование для отладки
if (typeof window !== 'undefined') {
	console.log('API Base URL (with /api):', SHOP_API_BASE_URL);
	console.log('Auth Base URL (without /api):', SHOP_AUTH_BASE_URL || '(empty - same origin)');
	console.log('Hostname:', window.location.hostname, 'NODE_ENV:', typeof process !== 'undefined' ? process.env?.NODE_ENV : 'undefined');
}

// ==================== TYPES ====================

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

// ==================== UTILITY FUNCTIONS ====================

/**
 * Получает значение cookie по имени
 */
const getCookie = (name: string): string | null => {
	if (typeof document === 'undefined') return null;
	const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
	return match ? decodeURIComponent(match[1]) : null;
};

/**
 * Создает заголовки для запросов с CSRF токеном
 */
const createHeaders = (options: {
	includeContentType?: boolean;
	includeXRequestedWith?: boolean;
} = {}): HeadersInit => {
	const headers: HeadersInit = {
		'Accept': 'application/json',
	};

	if (options.includeContentType) {
		headers['Content-Type'] = 'application/json';
	}

	if (options.includeXRequestedWith) {
		headers['X-Requested-With'] = 'XMLHttpRequest';
	}

	const csrfToken = getCookie('XSRF-TOKEN');
	if (csrfToken) {
		headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken);
	}

	return headers;
};

/**
 * Обрабатывает ошибки CORS и сетевые ошибки
 */
const handleFetchError = (error: any, url: string): never => {
	const errorMessage = error?.message || String(error);
	if (errorMessage.includes('CORS') || errorMessage.includes('Failed to fetch')) {
		const corsError = new Error('Ошибка подключения к серверу. Запрос блокируется политикой CORS. Пожалуйста, попросите администратора сервера исправить настройки CORS.');
		(corsError as any).isCorsError = true;
		throw corsError;
	}
	throw error;
};

/**
 * Парсит ответ API и извлекает массив данных из различных форматов
 */
const parseArrayResponse = <T>(data: any): T[] => {
	if (Array.isArray(data)) {
		return data;
	}
	if (data?.data && Array.isArray(data.data)) {
		return data.data;
	}
	if (data?.items && Array.isArray(data.items)) {
		return data.items;
	}
	if (data?.results && Array.isArray(data.results)) {
		return data.results;
	}
	return [];
};

/**
 * Форматирует ошибки валидации Laravel в читаемое сообщение
 */
const formatValidationErrors = (errorBody: any): string => {
	if (!errorBody?.errors) return '';

	const validationErrors = errorBody.errors;
	const errorMessages: string[] = [];

	if (typeof validationErrors === 'object') {
		Object.keys(validationErrors).forEach((field) => {
			const fieldErrors = validationErrors[field];
			if (Array.isArray(fieldErrors)) {
				fieldErrors.forEach((err: string) => {
					errorMessages.push(`${field}: ${err}`);
				});
			} else if (typeof fieldErrors === 'string') {
				errorMessages.push(`${field}: ${fieldErrors}`);
			}
		});
	}

	return errorMessages.length > 0 ? errorMessages.join('\n') : '';
};

/**
 * Универсальная функция для выполнения запросов с автоматической обработкой CSRF и ошибок
 */
const makeRequest = async <T = any>(
	url: string,
	options: {
		method?: string;
		body?: any;
		headers?: HeadersInit;
		ensureCsrf?: boolean;
		redirect?: RequestRedirect;
		parseJson?: boolean;
	} = {}
): Promise<T> => {
	const {
		method = 'GET',
		body,
		headers: customHeaders,
		ensureCsrf = true,
		redirect = 'follow',
		parseJson = true,
	} = options;

	// Получаем CSRF токен если нужно
	if (ensureCsrf) {
		try {
			await ensureShopCsrfCookie();
		} catch (error) {
			console.warn('CSRF cookie request failed, continuing without it:', error);
		}
	}

	// Создаем заголовки
	const defaultHeaders = createHeaders({
		includeContentType: !!body,
		includeXRequestedWith: method !== 'GET',
	});

	const headers = { ...defaultHeaders, ...customHeaders };

	// Выполняем запрос
	let response: Response;
	try {
		response = await fetch(url, {
			method,
			headers,
			credentials: 'include',
			body: body ? JSON.stringify(body) : undefined,
			redirect,
		});
	} catch (fetchError: any) {
		return handleFetchError(fetchError, url);
	}

	// Обрабатываем успешные ответы без тела
	if (response.status === 204 || response.status === 201) {
		return { ok: true } as T;
	}

	// Парсим ответ
	let responseData: any = null;
	if (parseJson) {
		try {
			const text = await response.text();
			if (text) {
				responseData = JSON.parse(text);
			}
		} catch (e) {
			console.warn('Failed to parse response:', e);
		}
	}

	// Обрабатываем ошибки
	if (!response.ok) {
		const message = responseData?.message || responseData?.error || `Ошибка запроса (${response.status})`;
		const validationErrors = formatValidationErrors(responseData);
		const fullMessage = validationErrors ? `${message}\n${validationErrors}` : message;

		const error = Object.assign(new Error(fullMessage), {
			status: response.status,
			details: responseData,
		});

		throw error;
	}

	return (responseData?.data ?? responseData ?? { ok: true }) as T;
};

// ==================== CSRF TOKEN ====================

/**
 * Получает CSRF токен из мета-тега или cookie
 */
export const ensureShopCsrfCookie = async (): Promise<boolean> => {
	try {
		// Пытаемся получить токен из мета-тега
		const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
		if (metaToken) {
			return true;
		}

		// Проверяем, есть ли уже токен в куки
		const existingToken = getCookie('XSRF-TOKEN');
		if (existingToken) {
			return true;
		}

		// Пробуем получить CSRF токен через Sanctum
		const csrfPath = '/sanctum/csrf-cookie';
		try {
			const res = await fetch(`${SHOP_API_BASE_URL}${csrfPath}`, {
				method: 'GET',
				credentials: 'include',
				headers: { 'Accept': 'application/json' },
			});

			if (res.ok || res.status === 204) {
				await new Promise(resolve => setTimeout(resolve, 200));
				const xsrfToken = getCookie('XSRF-TOKEN');
				if (xsrfToken) {
					return true;
				}
			}
		} catch (err: any) {
			if (!err?.message?.includes('CORS') && !err?.message?.includes('Failed to fetch')) {
				console.warn(`Failed to get CSRF from ${csrfPath}:`, err);
			}
		}

		return false;
	} catch (error) {
		console.warn('Failed to get CSRF token:', error);
		return false;
	}
};

// ==================== AUTHENTICATION ====================

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

	const xsrfFromCookie = getCookie('XSRF-TOKEN');
	const headers = createHeaders({
		includeContentType: true,
		includeXRequestedWith: true,
	});

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
		const retryToken = getCookie('XSRF-TOKEN');
		
		if (retryToken) {
			(headers as any)['X-XSRF-TOKEN'] = retryToken;
			const retryResponse = await fetch(url, {
				method: 'POST',
				headers,
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
		console.warn('Logout request failed, but continuing with local cleanup:', error);
		return { ok: true };
	}
};

// ==================== PROFILE ====================

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

// ==================== VALIDATION ====================

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

// ==================== DATA FETCHING ====================

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
			console.log(`${endpoint} endpoint not found, returning empty array`);
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
