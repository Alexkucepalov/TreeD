const path = require('path'); //для того чтобы превратить отнсительный путь в абсолютный мы будем использовать пакет path
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname, './dist'),
		host: '3d-shop',
		port: 3000,
		allowedHosts: 'all',
		open: true,
		hot: true,
		proxy: [
			// Прокси для аутентификации (без /api)
			{
				context: ['/login', '/register', '/logout', '/sanctum', '/forgot-password', '/reset-password'],
				target: 'https://treed.pro',
				secure: true,
				changeOrigin: true,
				ws: false,
				timeout: 60000,
				proxyTimeout: 60000,
				logLevel: 'debug',
				// Настройка cookie для работы через прокси
				cookieDomainRewrite: '3d-shop',
				cookiePathRewrite: '/',
				onProxyReq: (proxyReq, req, res) => {
					console.log('[PROXY] ===========================================');
					console.log('[PROXY] Original URL:', req.url);
					console.log('[PROXY] Method:', req.method);
					console.log('[PROXY] Path:', proxyReq.path);
					console.log('[PROXY] Full URL: https://treed.pro' + proxyReq.path);
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
						if (location && location.startsWith('https://treed.pro')) {
							const newLocation = location.replace('https://treed.pro', 'http://3d-shop:3000');
							proxyRes.headers['location'] = newLocation;
							console.log('[PROXY] Redirect changed from', location, 'to', newLocation);
						}
					}
					
					// Обрабатываем Set-Cookie заголовки - важно для CSRF токенов
					const setCookieHeaders = proxyRes.headers['set-cookie'];
					if (setCookieHeaders) {
						console.log('[PROXY] Original Set-Cookie headers:', setCookieHeaders);
						
						const cookies = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
						
						const modifiedCookies = cookies.map(cookie => {
							let modifiedCookie = cookie
								.replace(/domain=[^;]+;?/gi, '')
								.replace(/secure;?/gi, '');
							
							modifiedCookie = modifiedCookie.replace(/; ;/g, ';').replace(/;$/g, '');
							
							return modifiedCookie;
						});
						
						proxyRes.headers['set-cookie'] = modifiedCookies;
						console.log('[PROXY] Modified Set-Cookie headers:', modifiedCookies);
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
				target: 'https://treed.pro',
				secure: true,
				changeOrigin: true,
				ws: false,
				timeout: 60000,
				proxyTimeout: 60000,
				logLevel: 'debug',
				// Настройка cookie для работы через прокси
				cookieDomainRewrite: '3d-shop',
				cookiePathRewrite: '/',
				onProxyReq: (proxyReq, req, res) => {
					console.log('[PROXY API] ===========================================');
					console.log('[PROXY API] Original URL:', req.url);
					console.log('[PROXY API] Method:', req.method);
					console.log('[PROXY API] Path:', proxyReq.path);
					console.log('[PROXY API] Full URL: https://treed.pro' + proxyReq.path);
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
						if (location && location.startsWith('https://treed.pro')) {
							// Заменяем на локальный URL для прокси
							const newLocation = location.replace('https://treed.pro', 'http://3d-shop:3000');
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
							let modifiedCookie = cookie
								.replace(/domain=[^;]+;?/gi, '')
								.replace(/secure;?/gi, '');
							
							modifiedCookie = modifiedCookie.replace(/; ;/g, ';').replace(/;$/g, '');
							
							return modifiedCookie;
						});
						
						proxyRes.headers['set-cookie'] = modifiedCookies;
						console.log('[PROXY API] Modified Set-Cookie headers:', modifiedCookies);
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