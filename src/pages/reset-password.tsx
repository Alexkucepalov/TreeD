import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { TextField, Button, IconButton, InputAdornment, Box, Typography, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from './login.module.scss';
import logoImg from '../app/assets/logo.png';

const ResetPassword = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (password !== confirmPassword) {
			setError('Пароли не совпадают');
			return;
		}

		if (password.length < 6) {
			setError('Пароль должен содержать минимум 6 символов');
			return;
		}

		setSubmitting(true);

		try {
			// TODO: Добавить API вызов для сброса пароля
			// const response = await fetch('http://treed.pro/api/reset-password', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ token, password, password_confirmation: confirmPassword })
			// });
			
			// Пока просто показываем успешное сообщение
			setTimeout(() => {
				setSuccess(true);
				setSubmitting(false);
			}, 1000);
		} catch (err: any) {
			setError(err.message || 'Произошла ошибка при сбросе пароля');
			setSubmitting(false);
		}
	};

	if (!token) {
		return (
			<div>
				<div className={styles.loginBg} />
				<div className={styles.loginPageWrapper}>
					<div className={styles.loginCard}>
						<div className={styles.loginLogoBlock}>
							<img src={logoImg} alt="logo" className={styles.loginLogo} />
						</div>
						<Alert severity="error" sx={{ mb: 2 }}>
							Отсутствует токен для сброса пароля
						</Alert>
						<Button
							fullWidth
							variant='contained'
							onClick={() => navigate('/forgot-password')}
							sx={{
								mt: 2,
								py: 1.5,
								fontSize: '16px',
								fontWeight: 500,
								borderRadius: 2,
								textTransform: 'none',
								background: '#9163FF',
								'&:hover': { background: '#5B4C9D' }
							}}
						>
							Запросить восстановление пароля
						</Button>
					</div>
				</div>
			</div>
		);
	}

	if (success) {
		return (
			<div>
				<div className={styles.loginBg} />
				<div className={styles.loginPageWrapper}>
					<div className={styles.loginCard}>
						<div className={styles.loginLogoBlock}>
							<img src={logoImg} alt="logo" className={styles.loginLogo} />
						</div>
						<Alert severity="success" sx={{ mb: 2 }}>
							Пароль успешно изменен
						</Alert>
						<Button
							fullWidth
							variant='contained'
							onClick={() => navigate('/login')}
							sx={{
								mt: 2,
								py: 1.5,
								fontSize: '16px',
								fontWeight: 500,
								borderRadius: 2,
								textTransform: 'none',
								background: '#9163FF',
								'&:hover': { background: '#5B4C9D' }
							}}
						>
							Войти
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className={styles.loginBg} />
			<div className={styles.loginPageWrapper}>
				<div className={styles.loginCard}>
					<div className={styles.loginLogoBlock}>
						<img src={logoImg} alt="logo" className={styles.loginLogo} />
					</div>
					
					<Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 500 }}>
						Восстановление пароля
					</Typography>
					
					<Typography sx={{ textAlign: 'center', mb: 3, color: '#666', fontSize: 14 }}>
						Введите новый пароль
					</Typography>
					
					<Box component="form" onSubmit={handleSubmit} sx={{ 
						display: 'flex', 
						flexDirection: 'column', 
						gap: 2, 
						width: '100%', 
						maxWidth: 400, 
						alignItems: 'center' 
					}}>
						{error && (
							<Alert severity="error" sx={{ width: '100%' }}>
								{error}
							</Alert>
						)}
						
						<TextField
							label='Новый пароль'
							variant='outlined'
							fullWidth
							type={showPassword ? 'text' : 'password'}
							autoComplete='new-password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							InputProps={{
								startAdornment: (
									<LockOutlinedIcon sx={{ mr: 1, color: '#999' }} />
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								'& input:-webkit-autofill': {
									WebkitBoxShadow: '0 0 0 1000px white inset !important',
									WebkitTextFillColor: '#333 !important',
									backgroundColor: 'transparent !important',
									backgroundImage: 'none !important',
									backgroundClip: 'content-box !important',
									WebkitBackgroundClip: 'content-box !important',
									color: '#333 !important',
								},
							}}
						/>
						
						<TextField
							label='Подтвердите пароль'
							variant='outlined'
							fullWidth
							type={showConfirmPassword ? 'text' : 'password'}
							autoComplete='new-password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							InputProps={{
								startAdornment: (
									<LockOutlinedIcon sx={{ mr: 1, color: '#999' }} />
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label={showConfirmPassword ? 'Скрыть пароль' : 'Показать пароль'}
											onClick={handleClickShowConfirmPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{
								'& input:-webkit-autofill': {
									WebkitBoxShadow: '0 0 0 1000px white inset !important',
									WebkitTextFillColor: '#333 !important',
									backgroundColor: 'transparent !important',
									backgroundImage: 'none !important',
									backgroundClip: 'content-box !important',
									WebkitBackgroundClip: 'content-box !important',
									color: '#333 !important',
								},
							}}
						/>
						
						<Button
							type="submit"
							fullWidth
							variant='contained'
							disabled={submitting || !password || !confirmPassword}
							sx={{
								mt: 2,
								py: 1.5,
								fontSize: '16px',
								fontWeight: 500,
								borderRadius: 2,
								textTransform: 'none',
								background: '#9163FF',
								'&:hover': { background: '#5B4C9D' },
								'&:disabled': { background: '#ccc' }
							}}
						>
							{submitting ? 'Сохраняю...' : 'Сохранить'}
						</Button>
						
						<Box sx={{ textAlign: 'center', mt: 3 }}>
							<Typography sx={{ fontSize: 14, color: '#666' }}>
								<Link to="/login" style={{ color: '#9163FF', textDecoration: 'none', fontWeight: 500 }}>
									Вернуться к входу
								</Link>
							</Typography>
						</Box>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;




