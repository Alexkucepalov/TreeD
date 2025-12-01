import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import styles from '@pages/profile.module.scss';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logoutUserGet, updateUser } from '@features/auth/api/authActions';
import { Loader } from '@shared/components/Loader';
import { MakerDashboard } from '../components/MakerDashboard';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileContent } from '../components/ProfileContent';
import { Orders } from '@shared/components/Orders';
import { Analytics } from '@shared/components/Analytics';

const Profile = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { user, loading, error } = useAppSelector((state) => state.auth);
	
	// Проверяем, является ли пользователь мастером/контрактором
	const isContractor = user?.role === 'contractor' || user?.role === 'maker';

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isFormChanged, setIsFormChanged] = useState(false);

	// Обновляем локальные состояния при изменении пользователя
	useEffect(() => {
		if (user) {
			setName(user.nickname || '');
			setEmail(user.email || '');
			setPassword('');
			setIsFormChanged(false);
		}
	}, [user]);

	// Проверка, изменились ли значения формы относительно исходных данных пользователя
	const checkFormChanged = (
		newName: string,
		newEmail: string,
		newPassword: string
	) => {
		if (!user) return false;
		return (
			newName !== user.nickname || newEmail !== user.email || newPassword !== ''
		);
	};

	// Обработчик изменения любого поля формы
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'name':
				setName(value);
				break;
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
		}
		// Проверяем, изменена ли форма
		setIsFormChanged(
			checkFormChanged(
				name === 'name' ? value : name,
				name === 'email' ? value : email,
				name === 'password' ? value : password
			)
		);
	};

	// Обработчик отправки формы (сохранение изменений)
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await dispatch(updateUser({ email, nickname: name, password }));
			setIsFormChanged(false);
			setPassword('');
		} catch (error) {
			console.error('Ошибка при обновлении данных:', error);
		}
	};

	// Обработчик отмены изменений (возврат к исходным данным)
	const handleCancel = () => {
		if (user) {
			setName(user.nickname || '');
			setEmail(user.email || '');
			setPassword('');
			setIsFormChanged(false);
		}
	};

	// Обработчик выхода из системы
	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			console.log('Profile: Starting logout with GET /logout');
			await dispatch(logoutUserGet()).unwrap();
			console.log('Profile: Logout successful, navigating to login');
			navigate('/login');
		} catch (error) {
			console.error('Ошибка при выходе из системы:', error);
			navigate('/login');
		}
	};

	// Отображение состояния загрузки
	if (loading) return <Loader text="Загрузка..." />;
	
	// Не показываем ошибку, если пользователь есть
	if (error && !user) {
		return (
			<div style={{ padding: '20px', textAlign: 'center' }}>
				<p style={{ color: '#d32f2f' }}>Ошибка: {error}</p>
				<p style={{ marginTop: '10px' }}>Попробуйте обновить страницу или войти заново.</p>
			</div>
		);
	}

	// Показываем профиль с заказами и аналитикой для всех авторизованных пользователей
	if (user) {
		return (
			<div className={styles.profilePageWrapper}>
				<ProfileHeader />
				<ProfileContent
					userName={user?.nickname || user?.email || 'User Name'}
					userRole={isContractor ? "Maker" : "User"}
					userCity="Москва"
					rating={4.9}
					ratingCount={13}
					technologies={['FDM', 'SLA', 'PETG', 'TPU']}
					description="Печатаю ABS/PETG, опыт 5 лет. Краткая самопрезентация: имя/ник, фото, рейтинг, регион, выбранные теги."
					revenue={16054}
					ordersCount={1}
				/>
				<Orders />
				<Analytics />
			</div>
		);
	}

	// Для неавторизованных пользователей показываем форму редактирования профиля
	return (
		<div>
			<div className={styles.profileContainer}>
				<div className={styles.sidebar}>
					<Link
						to='/profile'
						className={`text text_type_main-medium ${
							location.pathname === '/profile' ? styles.active : ''
						}`}>
						Профиль
					</Link>
					<a
						href='#'
						onClick={handleLogout}
						className={`text text_type_main-medium text_color_inactive`}>
						Выход
					</a>
					<div className={styles.profileContent + ' pt-20'}>
						<p className='text text_type_main-default'>
							В этом разделе вы можете изменить свои персональные данные
						</p>
					</div>
				</div>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}
				>
					<TextField
						label="Имя"
						name="name"
						value={name}
						onChange={handleInputChange}
						fullWidth
						variant="outlined"
					/>
					<TextField
						label="Email"
						name="email"
						type="email"
						value={email}
						onChange={handleInputChange}
						fullWidth
						variant="outlined"
					/>
					<TextField
						label="Пароль"
						name="password"
						type="password"
						value={password}
						onChange={handleInputChange}
						fullWidth
						variant="outlined"
					/>
					{isFormChanged && (
						<Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
							<Button 
								type="submit" 
								variant="contained" 
								color="primary"
							>
								Сохранить
							</Button>
							<Button
								type="button"
								variant="outlined"
								onClick={handleCancel}
							>
								Отмена
							</Button>
						</Box>
					)}
				</Box>
			</div>
		</div>
	);
};

export default Profile;

