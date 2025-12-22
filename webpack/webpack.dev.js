const path = require('path'); //для того чтобы превратить отнсительный путь в абсолютный мы будем использовать пакет path
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname, './dist'),
		// Локальный хост для дев-режима; используем 3d-shop для работы с локальным Docker
		host: '3d-shop',
		port: 3000,
		allowedHosts: 'all',
		open: true,
		hot: true,
		proxy: [
			// Прокси для аутентификации (без /api)
			{
				context: ['/login', '/register', '/logout', '/sanctum', '/forgot-password', '/reset-password'],
				target: 'http://3d-shop',
				secure: false,
				changeOrigin: true,
				ws: false,
				timeout: 60000,
				proxyTimeout: 60000,
				logLevel: 'debug',
				// Настройка cookie для работы через прокси
				// Убираем domain rewrite, чтобы куки устанавливались для localhost
				cookieDomainRewrite: '',
				cookiePathRewrite: '/',
				onProxyReq: (proxyReq, req, res) => {
					// Явно передаем куки из браузера в запрос к бэкенду
					const cookiesFromBrowser = req.headers.cookie || '';
					if (cookiesFromBrowser) {
						proxyReq.setHeader('Cookie', cookiesFromBrowser);
					}
					
					// Изменяем Origin заголовок для Laravel Sanctum
					// Laravel Sanctum проверяет Origin и должен видеть разрешенный домен
					const originalOrigin = req.headers.origin;
					if (originalOrigin && (originalOrigin.includes('localhost:3000') || originalOrigin.includes('127.0.0.1:3000'))) {
						proxyReq.setHeader('Origin', 'https://treed.pro');
						console.log('[PROXY] Origin changed from', originalOrigin, 'to https://treed.pro');
					} else if (originalOrigin) {
						console.log('[PROXY] Origin not changed:', originalOrigin);
					}
					
					// Парсим куки для логирования
					const cookieList = cookiesFromBrowser.split(';').map(c => c.trim()).filter(c => c);
					const xsrfCookie = cookieList.find(c => c.startsWith('XSRF-TOKEN='));
					const sessionCookie = cookieList.find(c => c.startsWith('laravel_session='));
					
					// Извлекаем значения cookie для детального логирования
					const xsrfValue = xsrfCookie ? xsrfCookie.substring('XSRF-TOKEN='.length) : null;
					const sessionValue = sessionCookie ? sessionCookie.substring('laravel_session='.length) : null;
					
					// Логируем важные заголовки
					const importantHeaders = ['origin', 'referer', 'x-xsrf-token', 'x-csrf-token', 'x-requested-with'];
					const headersToLog = {};
					importantHeaders.forEach(header => {
						const value = proxyReq.getHeader(header) || req.headers[header];
						if (value) {
							headersToLog[header] = typeof value === 'string' ? value.substring(0, 100) : value;
						}
					});
					
					// Проверяем, что cookie действительно установлены в запросе к бэкенду
					const cookieHeaderSentToBackend = proxyReq.getHeader('Cookie');
					
					console.log('[PROXY] ===========================================');
					console.log('[PROXY] Original URL:', req.url);
					console.log('[PROXY] Method:', req.method);
					console.log('[PROXY] Path:', proxyReq.path);
					console.log('[PROXY] Full URL: http://3d-shop' + proxyReq.path);
					console.log('[PROXY] Cookies from browser:', cookiesFromBrowser || '(none)');
					console.log('[PROXY] Cookie count:', cookieList.length);
					console.log('[PROXY] XSRF-TOKEN in cookies:', xsrfCookie ? 'YES' : 'NO');
					if (xsrfValue) {
						console.log('[PROXY]   XSRF-TOKEN value (first 50 chars):', xsrfValue.substring(0, 50) + '...');
					}
					console.log('[PROXY] laravel_session in cookies:', sessionCookie ? 'YES' : 'NO');
					if (sessionValue) {
						console.log('[PROXY]   laravel_session value (first 50 chars):', sessionValue.substring(0, 50) + '...');
					}
					console.log('[PROXY] Cookie header sent to backend:', cookieHeaderSentToBackend ? 'YES' : 'NO');
					if (cookieHeaderSentToBackend) {
						const backendCookieList = cookieHeaderSentToBackend.split(';').map(c => c.trim());
						const backendXsrf = backendCookieList.find(c => c.startsWith('XSRF-TOKEN='));
						const backendSession = backendCookieList.find(c => c.startsWith('laravel_session='));
						console.log('[PROXY]   Backend will receive XSRF-TOKEN:', backendXsrf ? 'YES' : 'NO');
						console.log('[PROXY]   Backend will receive laravel_session:', backendSession ? 'YES' : 'NO');
					}
					console.log('[PROXY] Important headers:', headersToLog);
					console.log('[PROXY] ===========================================');
				},
				onProxyRes: (proxyRes, req, res) => {
					// Убираем дублирующиеся CORS заголовки, если они есть
					if (proxyRes.headers['access-control-allow-origin']) {
						const origins = proxyRes.headers['access-control-allow-origin'];
						if (Array.isArray(origins) && origins.length > 0) {
							proxyRes.headers['access-control-allow-origin'] = origins[0];
						} else if (typeof origins === 'string' && origins.includes(',')) {
							proxyRes.headers['access-control-allow-origin'] = origins.split(',')[0].trim();
						}
					}
					
					// Обрабатываем другие потенциально дублирующиеся CORS заголовки
					const corsHeaders = [
						'access-control-allow-methods',
						'access-control-allow-headers',
						'access-control-allow-credentials',
						'access-control-expose-headers'
					];
					
					corsHeaders.forEach(header => {
						if (proxyRes.headers[header]) {
							const values = proxyRes.headers[header];
							if (Array.isArray(values) && values.length > 0) {
								proxyRes.headers[header] = values[0];
							} else if (typeof values === 'string' && values.includes(',')) {
								proxyRes.headers[header] = values.split(',')[0].trim();
							}
						}
					});
					
					// Обрабатываем редиректы (301, 302) - меняем Location заголовок
					if (proxyRes.statusCode === 301 || proxyRes.statusCode === 302) {
						const location = proxyRes.headers['location'];
						if (location && (location.startsWith('http://3d-shop') || location.startsWith('https://treed.pro'))) {
							const newLocation = location.replace(/https?:\/\/[^\/]+/, 'http://localhost:3000');
							proxyRes.headers['location'] = newLocation;
							console.log('[PROXY] Redirect changed from', location, 'to', newLocation);
						}
					}
					
					// Обрабатываем Set-Cookie заголовки - важно для CSRF токенов
					const setCookieHeaders = proxyRes.headers['set-cookie'];
					if (setCookieHeaders) {
						console.log('[PROXY] ========== Set-Cookie Processing ==========');
						console.log('[PROXY] Original Set-Cookie headers:', setCookieHeaders);
						
						const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
						
						const modifiedCookies = cookies.map(cookie => {
							const originalCookie = cookie;
							
							// Убираем domain, secure и старый SameSite, чтобы куки устанавливались для localhost
							let modifiedCookie = cookie
								.replace(/domain=[^;]+;?/gi, '')
								.replace(/secure;?/gi, '') // КРИТИЧНО: убираем secure для HTTP
								.replace(/samesite=[^;]+;?/gi, '') // Убираем старый SameSite
								.replace(/SameSite=[^;]+;?/gi, ''); // Убираем старый SameSite (с заглавной)
							
							// Убираем лишние точки с запятой
							modifiedCookie = modifiedCookie.replace(/; ;/g, ';').replace(/;$/g, '');
							
							// Убеждаемся, что path установлен в /
							if (!modifiedCookie.includes('path=')) {
								modifiedCookie += '; path=/';
							}
							
							// Устанавливаем SameSite=Lax для localhost (нужно для работы с прокси)
							if (!modifiedCookie.includes('samesite=') && !modifiedCookie.includes('SameSite=')) {
								modifiedCookie += '; SameSite=Lax';
							}
							
						// Проверяем, какая кука обрабатывается
						const cookieName = originalCookie.split('=')[0];
						const isLaravelSession = cookieName.includes('laravel_session');
						const isXsrfToken = cookieName.includes('XSRF-TOKEN');
						
						console.log(`[PROXY] Processing cookie: ${cookieName}`);
						console.log(`[PROXY]   Is laravel_session: ${isLaravelSession}`);
						console.log(`[PROXY]   Is XSRF-TOKEN: ${isXsrfToken}`);
						console.log(`[PROXY]   Original: ${originalCookie.substring(0, 150)}...`);
						console.log(`[PROXY]   Modified: ${modifiedCookie.substring(0, 150)}...`);
							
							return modifiedCookie;
						});
						
						proxyRes.headers['set-cookie'] = modifiedCookies;
						console.log('[PROXY] Final Set-Cookie headers:', modifiedCookies);
						console.log('[PROXY] ===========================================');
					} else {
						console.log('[PROXY] ⚠️  No Set-Cookie headers in response!');
						console.log('[PROXY] Response status:', proxyRes.statusCode);
						console.log('[PROXY] Response headers keys:', Object.keys(proxyRes.headers));
					}
					
					console.log('[PROXY] Response status:', proxyRes.statusCode, 'for', req.url);
				},
				onError: (err, req, res) => {
					console.error('[PROXY] Error:', err.message);
					console.error('[PROXY] Error details:', {
						code: err.code,
						syscall: err.syscall,
						address: err.address,
						port: err.port
					});
					if (!res.headersSent) {
						res.writeHead(504, {
							'Content-Type': 'application/json',
						});
						res.end(JSON.stringify({
							error: 'Gateway Timeout',
							message: 'Сервер не ответил вовремя. Попробуйте позже или проверьте доступность сервера.'
						}));
					}
				}
			},
			// Прокси для API эндпоинтов (с /api)
			{
				context: ['/api'],
				target: 'http://3d-shop',
				secure: false,
				changeOrigin: true,
				ws: false,
				timeout: 60000,
				proxyTimeout: 60000,
				logLevel: 'debug',
				// Настройка cookie для работы через прокси
				// Убираем domain rewrite, чтобы куки устанавливались для localhost
				cookieDomainRewrite: '',
				cookiePathRewrite: '/',
				onProxyReq: (proxyReq, req, res) => {
					// Явно передаем куки из браузера в запрос к бэкенду
					const cookiesFromBrowser = req.headers.cookie || '';
					if (cookiesFromBrowser) {
						proxyReq.setHeader('Cookie', cookiesFromBrowser);
					}
					
					// Парсим куки для логирования
					const cookieList = cookiesFromBrowser.split(';').map(c => c.trim()).filter(c => c);
					const xsrfCookie = cookieList.find(c => c.startsWith('XSRF-TOKEN='));
					const sessionCookie = cookieList.find(c => c.startsWith('laravel_session='));
					
					// Извлекаем значения cookie для детального логирования
					const xsrfValue = xsrfCookie ? xsrfCookie.substring('XSRF-TOKEN='.length) : null;
					const sessionValue = sessionCookie ? sessionCookie.substring('laravel_session='.length) : null;
					
					// Логируем важные заголовки
					const importantHeaders = ['origin', 'referer', 'x-xsrf-token', 'x-csrf-token', 'x-requested-with'];
					const headersToLog = {};
					importantHeaders.forEach(header => {
						const value = proxyReq.getHeader(header) || req.headers[header];
						if (value) {
							headersToLog[header] = typeof value === 'string' ? value.substring(0, 100) : value;
						}
					});
					
					// Проверяем, что cookie действительно установлены в запросе к бэкенду
					const cookieHeaderSentToBackend = proxyReq.getHeader('Cookie');
					
					console.log('[PROXY API] ===========================================');
					console.log('[PROXY API] Original URL:', req.url);
					console.log('[PROXY API] Method:', req.method);
					console.log('[PROXY API] Path:', proxyReq.path);
					console.log('[PROXY API] Full URL: http://3d-shop' + proxyReq.path);
					console.log('[PROXY API] Cookies from browser:', cookiesFromBrowser || '(none)');
					console.log('[PROXY API] Cookie count:', cookieList.length);
					console.log('[PROXY API] XSRF-TOKEN in cookies:', xsrfCookie ? 'YES' : 'NO');
					if (xsrfValue) {
						console.log('[PROXY API]   XSRF-TOKEN value (first 50 chars):', xsrfValue.substring(0, 50) + '...');
					}
					console.log('[PROXY API] laravel_session in cookies:', sessionCookie ? 'YES' : 'NO');
					if (sessionValue) {
						console.log('[PROXY API]   laravel_session value (first 50 chars):', sessionValue.substring(0, 50) + '...');
					}
					console.log('[PROXY API] Cookie header sent to backend:', cookieHeaderSentToBackend ? 'YES' : 'NO');
					if (cookieHeaderSentToBackend) {
						const backendCookieList = cookieHeaderSentToBackend.split(';').map(c => c.trim());
						const backendXsrf = backendCookieList.find(c => c.startsWith('XSRF-TOKEN='));
						const backendSession = backendCookieList.find(c => c.startsWith('laravel_session='));
						console.log('[PROXY API]   Backend will receive XSRF-TOKEN:', backendXsrf ? 'YES' : 'NO');
						console.log('[PROXY API]   Backend will receive laravel_session:', backendSession ? 'YES' : 'NO');
					}
					console.log('[PROXY API] Important headers:', headersToLog);
					console.log('[PROXY API] ===========================================');
				},
				onProxyRes: (proxyRes, req, res) => {
					// Убираем дублирующиеся CORS заголовки, если они есть
					if (proxyRes.headers['access-control-allow-origin']) {
						const origins = proxyRes.headers['access-control-allow-origin'];
						if (Array.isArray(origins) && origins.length > 0) {
							// Берем только первое значение
							proxyRes.headers['access-control-allow-origin'] = origins[0];
						} else if (typeof origins === 'string' && origins.includes(',')) {
							// Если несколько значений через запятую, берем первое
							proxyRes.headers['access-control-allow-origin'] = origins.split(',')[0].trim();
						}
					}
					
					// Обрабатываем другие потенциально дублирующиеся CORS заголовки
					const corsHeaders = [
						'access-control-allow-methods',
						'access-control-allow-headers',
						'access-control-allow-credentials',
						'access-control-expose-headers'
					];
					
					corsHeaders.forEach(header => {
						if (proxyRes.headers[header]) {
							const values = proxyRes.headers[header];
							if (Array.isArray(values) && values.length > 0) {
								proxyRes.headers[header] = values[0];
							} else if (typeof values === 'string' && values.includes(',')) {
								proxyRes.headers[header] = values.split(',')[0].trim();
							}
						}
					});
					
					// Обрабатываем редиректы (301, 302) - меняем Location заголовок
					if (proxyRes.statusCode === 301 || proxyRes.statusCode === 302) {
						const location = proxyRes.headers['location'];
						if (location && (location.startsWith('http://3d-shop') || location.startsWith('https://treed.pro'))) {
							// Заменяем на локальный URL для прокси
							const newLocation = location.replace(/https?:\/\/[^\/]+/, 'http://localhost:3000');
							proxyRes.headers['location'] = newLocation;
							console.log('[PROXY API] Redirect changed from', location, 'to', newLocation);
						}
					}
					
					// Обрабатываем Set-Cookie заголовки
					const setCookieHeaders = proxyRes.headers['set-cookie'];
					if (setCookieHeaders) {
						console.log('[PROXY API] Original Set-Cookie headers:', setCookieHeaders);
						
						const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
						
						const modifiedCookies = cookies.map(cookie => {
							// Убираем domain, secure и старый SameSite, чтобы куки устанавливались для localhost
							let modifiedCookie = cookie
								.replace(/domain=[^;]+;?/gi, '')
								.replace(/secure;?/gi, '') // КРИТИЧНО: убираем secure для HTTP
								.replace(/samesite=[^;]+;?/gi, '') // Убираем старый SameSite
								.replace(/SameSite=[^;]+;?/gi, ''); // Убираем старый SameSite (с заглавной)
							
							// Убираем лишние точки с запятой
							modifiedCookie = modifiedCookie.replace(/; ;/g, ';').replace(/;$/g, '');
							
							// Убеждаемся, что path установлен в /
							if (!modifiedCookie.includes('path=')) {
								modifiedCookie += '; path=/';
							}
							
							// Устанавливаем SameSite=Lax для localhost (нужно для работы с прокси)
							if (!modifiedCookie.includes('samesite=') && !modifiedCookie.includes('SameSite=')) {
								modifiedCookie += '; SameSite=Lax';
							}
							
							const cookieName = cookie.split('=')[0];
							const isLaravelSession = cookieName.includes('laravel_session');
							const isXsrfToken = cookieName.includes('XSRF-TOKEN');
							
							console.log('[PROXY API] Cookie modified:', cookieName);
							console.log('[PROXY API]   Is laravel_session:', isLaravelSession);
							console.log('[PROXY API]   Is XSRF-TOKEN:', isXsrfToken);
							console.log('[PROXY API]   Original (first 150 chars):', cookie.substring(0, 150) + '...');
							console.log('[PROXY API]   Modified (first 150 chars):', modifiedCookie.substring(0, 150) + '...');
							return modifiedCookie;
						});
						
						proxyRes.headers['set-cookie'] = modifiedCookies;
						console.log('[PROXY API] Modified Set-Cookie headers:', modifiedCookies);
					} else {
						console.log('[PROXY API] No Set-Cookie headers in response');
					}
					
					console.log('[PROXY API] Response status:', proxyRes.statusCode, 'for', req.url);
				},
				onError: (err, req, res) => {
					console.error('[PROXY API] Error:', err.message);
					console.error('[PROXY API] Error details:', {
						code: err.code,
						syscall: err.syscall,
						address: err.address,
						port: err.port
					});
					if (!res.headersSent) {
						res.writeHead(504, {
							'Content-Type': 'application/json',
						});
						res.end(JSON.stringify({
							error: 'Gateway Timeout',
							message: 'Сервер не ответил вовремя. Попробуйте позже или проверьте доступность сервера.'
						}));
					}
				}
			}
		]
	},
	plugins: [new ReactRefreshWebpackPlugin()],
};