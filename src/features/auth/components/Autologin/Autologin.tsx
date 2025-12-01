import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchUser } from '../../api/authActions';

export const Autologin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { user, loading, error, isAuthChecked } = useAppSelector(state => state.auth);

    console.log('Autologin Rendered: user=', user, 'loading=', loading, 'error=', error, 'isAuthChecked=', isAuthChecked);

    useEffect(() => {
        console.log('Autologin useEffect triggered');
        const accessToken = localStorage.getItem('accessToken');
        console.log('Autologin useEffect: accessToken=', accessToken, 'user=', user, 'loading=', loading, 'isAuthChecked=', isAuthChecked);
        console.log('Autologin useEffect: user details=', user ? { id: user.id, email: user.email, nickname: user.nickname } : 'null');
        
        // Проверяем, есть ли токен (включая сессионный токен)
        const hasToken = accessToken && accessToken.length > 0;
        
        // Проверяем, нуждается ли пользователь в получении полного профиля
        const needsProfileFetch = user && (user as any).needsProfileFetch;
        
        if (hasToken && (!user || needsProfileFetch) && !loading && !isAuthChecked && !error) {
            console.log('Autologin useEffect: Dispatching fetchUser with token:', accessToken, 'needsProfileFetch:', needsProfileFetch);
            dispatch(fetchUser());
        } else if (!hasToken && !user && !loading && !isAuthChecked) {
            console.log('Autologin useEffect: No token, marking auth as checked');
            // Если нет токена, помечаем авторизацию как проверенную
            dispatch({ type: 'auth/fetchUser/rejected', error: { message: 'No token' } });
        }
    }, [dispatch, user, loading, isAuthChecked, error]);

    return <>{children}</>;
};

