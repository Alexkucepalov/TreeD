// Общие функции для работы с API

// Бэкенд 3D-шоп (опубликованный на https://treed.pro)
// В dev режиме используем относительный путь через webpack proxy для обхода CORS
// В production используем прямой URL
const isProduction = typeof window === 'undefined' 
	? (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production')
	: (window.location.hostname === 'treed.pro' || window.location.hostname.includes('treed.pro'));

// Базовый URL для API эндпоинтов (с /api префиксом)
export const SHOP_API_BASE_URL = isProduction ? 'https://treed.pro/api' : '/api';

// Базовый URL для аутентификации (без /api префикса)
export const SHOP_AUTH_BASE_URL = isProduction ? 'https://treed.pro' : '';


/**
 * Получает значение cookie по имени
 * Важно: document.cookie возвращает значения как есть, без автоматического декодирования
 * Laravel Sanctum хранит токен в URL-encoded формате, поэтому нужно декодировать
 */
const getCookie = (name: string): string | null => {
	if (typeof document === 'undefined') return null;
	const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
	if (!match) return null;
	const rawValue = match[1];
	
	// Проверяем, нужно ли декодировать (если содержит URL-encoded символы)
	if (rawValue.includes('%')) {
		try {
			// Декодируем cookie значение, так как Laravel хранит токен в URL-encoded формате
			return decodeURIComponent(rawValue);
		} catch (e) {
			// Если декодирование не удалось, возвращаем как есть
			return rawValue;
		}
	}
	// Если нет URL-encoded символов, возвращаем как есть
	return rawValue;
};

/**
 * Создает заголовки для запросов с CSRF токеном
 */
export const createHeaders = (options: {
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
		// getCookie уже декодирует cookie из URL-encoded формата
		// Laravel Sanctum хранит токен в cookie в URL-encoded формате
		// Laravel ожидает токен в декодированном виде в заголовке X-XSRF-TOKEN
		// getCookie уже декодирует, поэтому используем токен как есть
		const tokenToSend = csrfToken;
		
		// Laravel Sanctum проверяет заголовок X-XSRF-TOKEN с декодированным токеном
		// По документации Laravel Sanctum, токен должен быть декодирован в заголовке
		headers['X-XSRF-TOKEN'] = tokenToSend;
	}

	return headers;
};

/**
 * Обрабатывает ошибки CORS и сетевые ошибки
 */
export const handleFetchError = (error: any, url: string): never => {
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
export const parseArrayResponse = <T>(data: any): T[] => {
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
export const formatValidationErrors = (errorBody: any): string => {
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
 * Получает CSRF токен из мета-тега или cookie
 */
export const ensureShopCsrfCookie = async (): Promise<boolean> => {
	// Используем ту же логику декодирования, что и в основной функции getCookie
	const getCookieLocal = (name: string): string | null => {
		if (typeof document === 'undefined') return null;
		const match = document.cookie.match(
			new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
		);
		if (!match) return null;
		const rawValue = match[1];
		
		// Проверяем, нужно ли декодировать (если содержит URL-encoded символы)
		if (rawValue.includes('%')) {
		try {
			return decodeURIComponent(rawValue);
		} catch (e) {
			return rawValue;
		}
		}
		return rawValue;
	};

	try {
		// ВСЕГДА явно дергаем Sanctum, чтобы гарантированно получить свежий CSRF
		const csrfPath = '/sanctum/csrf-cookie';
		const url = `${SHOP_AUTH_BASE_URL}${csrfPath}`;
		
		const res = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			headers: { 
				Accept: 'application/json',
				Origin: window.location.origin, // Явно указываем Origin для Laravel Sanctum
			},
		});

		if (!res.ok && res.status !== 204) {
			return false;
		}

		// Даём браузеру время записать куку
		await new Promise((resolve) => setTimeout(resolve, 1000));
		
		const xsrfToken = getCookieLocal('XSRF-TOKEN');
		
		if (!xsrfToken) {
			return false;
		}

		return true;
	} catch (error) {
		return false;
	}
};

/**
 * Универсальная функция для выполнения запросов с автоматической обработкой CSRF и ошибок
 */
export const makeRequest = async <T = any>(
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
			// Даём дополнительное время для синхронизации cookie после получения CSRF
			await new Promise((resolve) => setTimeout(resolve, 200));
		} catch (error) {
			// CSRF cookie request failed, continuing without it
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
			// Failed to parse response
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

