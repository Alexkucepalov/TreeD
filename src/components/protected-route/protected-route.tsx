import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@store/hooks';
import { Loader } from '@shared/components/Loader';

interface ProtectedRouteElementProps {
	children: React.ReactNode;
	onlyForAuth?: boolean; // Если true, маршрут доступен только для авторизованных пользователей
	onlyForUnauth?: boolean; // Если true, маршрут доступен только для неавторизованных пользователей
}

const ProtectedRouteElement: React.FC<ProtectedRouteElementProps> = ({
	children,
	onlyForAuth = false,
	onlyForUnauth = false,
}) => {
	const { user, loading, accessToken } = useAppSelector((state) => state.auth);
	const location = useLocation();

	// Если идет загрузка, показываем загрузку
	if (loading) {
		return <Loader text="Загрузка..." />;
	}

	// Проверяем авторизацию по токену, а не только по наличию user
	// Это позволяет оставаться на защищенных страницах даже при ошибке загрузки профиля
	const isAuthenticated = user || localStorage.getItem('accessToken') || accessToken;

	// Если маршрут доступен только для авторизованных пользователей
	if (onlyForAuth && !isAuthenticated) {
		// Сохраняем текущий путь и состояние фона
		localStorage.setItem('redirectPath', location.pathname);
		if (location.state?.background) {
			localStorage.setItem('redirectBackground', JSON.stringify(location.state.background));
		}
		return <Navigate to='/login' state={{ from: location }} />;
	}

	// Если маршрут доступен только для неавторизованных пользователей
	if (onlyForUnauth && user) {
		// Проверяем, есть ли сохраненный путь для перенаправления
		const savedPath = localStorage.getItem('redirectPath');
		const savedBackground = localStorage.getItem('redirectBackground');
		
		if (savedPath) {
			const background = savedBackground ? JSON.parse(savedBackground) : undefined;
			localStorage.removeItem('redirectPath');
			localStorage.removeItem('redirectBackground');
			return <Navigate to={savedPath} state={{ background }} />;
		}
		return <Navigate to='/profile' />;
	}

	return <>{children}</>;
};

export default ProtectedRouteElement;
