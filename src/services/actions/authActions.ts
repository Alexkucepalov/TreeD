import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { resetAuth } from '@store/auth/authSlice';

// Авторизация пользователя
export const loginUser = createAsyncThunk(
	'auth/login',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			console.log('=== LOGIN USER ===');
			console.log('Login attempt with email:', email);
			console.log('Password length:', password.length);

			// Используем правильный API endpoint
			const { loginShopAccount } = await import('@shared/utils/api');
			const data = await loginShopAccount(email, password);

			console.log('Login response data:', data);
			console.log('User from login response:', data.user);

			// Сохраняем токены в localStorage
			if (data.accessToken) {
				const accessToken = data.accessToken.startsWith('Bearer ')
					? data.accessToken.split(' ')[1]
					: data.accessToken;
				localStorage.setItem('accessToken', accessToken);
				console.log('Stored accessToken:', accessToken);
			} else {
				// Если токен не пришел в ответе, но логин успешен, используем сессионный токен
				localStorage.setItem('accessToken', 'session-token');
				console.log('Stored session-token as accessToken');
			}

			if (data.refreshToken) {
				localStorage.setItem('refreshToken', data.refreshToken);
				console.log('Stored refreshToken:', data.refreshToken);
			}

			// Если пользователь не получен при логине, но логин успешен,
			// возвращаем структуру, которая позволит Autologin получить данные пользователя
			if (!data.user) {
				console.log(
					'No user data in login response, will be fetched by Autologin'
				);
				return {
					ok: true,
					user: null, // Будет получен через fetchUser в Autologin
					accessToken: data.accessToken || 'session-token',
				};
			}

			console.log('=== END LOGIN USER ===');

			return data;
		} catch (err: unknown) {
			console.error('Login error:', err);
			if (err instanceof Error) {
				return rejectWithValue(err.message);
			}
			return rejectWithValue('Неизвестная ошибка авторизации');
		}
	}
);

// Выход из системы через GET /logout
export const logoutUserGet = createAsyncThunk(
	'auth/logoutGet',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			console.log('=== LOGOUT USER GET ACTION ===');
			const { logoutUserGet: logoutApi } = await import('@shared/utils/api');

			await logoutApi();

			// Очищаем localStorage после успешного выхода
			clearLocalStorage();

			// Сбрасываем состояние Redux
			dispatch(resetAuth());

			console.log(
				'Cleared all localStorage items and reset Redux state after GET logout'
			);
			console.log('=== END LOGOUT USER GET ACTION ===');

			return { ok: true };
		} catch (err: unknown) {
			console.error('Logout GET error:', err);
			// Даже если запрос на сервер не удался, очищаем локальные токены
			clearLocalStorage();

			// Сбрасываем состояние Redux
			dispatch(resetAuth());

			console.log(
				'Cleared localStorage and reset Redux state after GET logout error'
			);

			return rejectWithValue(
				err instanceof Error ? err.message : 'Неизвестная ошибка выхода'
			);
		}
	}
);

// Получение данных пользователя
export const fetchUser = createAsyncThunk(
	'auth/fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			console.log('=== FETCH USER ===');
			const accessToken = localStorage.getItem('accessToken');
			console.log('Current accessToken from localStorage:', accessToken);

			if (!accessToken) throw new Error('Access token отсутствует');

			try {
				console.log('Making request to shop profile API');
				// Используем правильный API endpoint
				const { fetchShopProfile } = await import('@shared/utils/api');
				const data = await fetchShopProfile();

				console.log('fetchUser fulfilled, user data:', data);
				console.log('User email from API:', data?.email);
				console.log('User id from API:', data?.id);
				console.log('=== END FETCH USER ===');
				return data;
			} catch (err) {
				console.error('Error fetching user profile:', err);
				throw err;
			}
		} catch (err: unknown) {
			console.log('fetchUser rejected, error:', err);
			return rejectWithValue(
				err instanceof Error
					? err.message
					: 'Неизвестная ошибка получения данных пользователя'
			);
		}
	}
);

// Обновление данных пользователя
export const updateUser = createAsyncThunk(
	'auth/updateUser',
	async (
		{
			email,
			nickname,
			password,
		}: { email: string; nickname: string; password?: string },
		{ rejectWithValue }
	) => {
		try {
			console.log('=== UPDATE USER ===');
			console.log('Update user data:', {
				email,
				nickname,
				password: password ? '***' : 'none',
			});

			// Используем правильный API endpoint
			const { updateShopProfile } = await import('@shared/utils/api');
			const data = await updateShopProfile({ email, nickname, password });

			console.log('Update user response:', data);
			console.log('=== END UPDATE USER ===');

			return data;
		} catch (err: unknown) {
			console.error('Update user error:', err);
			return rejectWithValue(
				err instanceof Error
					? err.message
					: 'Неизвестная ошибка обновления данных пользователя'
			);
		}
	}
);

export const setAccessToken = createAction<string | null>(
	'auth/setAccessToken'
);

// Функция для очистки localStorage (для отладки)
export const clearLocalStorage = () => {
	console.log('=== CLEARING LOCALSTORAGE ===');
	console.log('Before clearing:');
	console.log('accessToken:', localStorage.getItem('accessToken'));
	console.log('refreshToken:', localStorage.getItem('refreshToken'));

	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('lastOrderHistoryPath');
	localStorage.removeItem('lastOrderHistoryBackground');
	localStorage.removeItem('lastOrderNumber');
	localStorage.removeItem('lastOrderBackground');
	localStorage.removeItem('redirectPath');
	localStorage.removeItem('redirectBackground');

	console.log('After clearing:');
	console.log('accessToken:', localStorage.getItem('accessToken'));
	console.log('refreshToken:', localStorage.getItem('refreshToken'));
	console.log('=== END CLEARING LOCALSTORAGE ===');
};

// Функция для полного сброса состояния авторизации
export const resetAuthState = () => {
	console.log('=== RESETTING AUTH STATE ===');
	clearLocalStorage();
	console.log('=== END RESETTING AUTH STATE ===');
};

// Добавляем функции в window для доступа из консоли
if (typeof window !== 'undefined') {
	(window as any).clearLocalStorage = clearLocalStorage;
	(window as any).resetAuthState = resetAuthState;
}
