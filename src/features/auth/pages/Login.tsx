import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, IconButton, InputAdornment, Box, Typography } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styles from '@pages/login.module.scss';
import logoImg from '@app/assets/logo.png';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loginUser } from '../api/authActions';

const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAppSelector((state) => state.auth);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			console.log('Login: Starting login process');
			console.log('Login: Email:', email);
			console.log('Login: Password length:', password.length);
			
			const result = await dispatch(loginUser({ email, password })).unwrap();
			console.log('Login: Login successful, result:', result);
			console.log('Login: User after login:', result.user);
			
			navigate('/profile');
		} catch (err) {
			console.error('Login error:', err);
		}
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<div>
			<div className={styles.loginBg} />
			<div className={styles.loginPageWrapper}>
				<div className={styles.loginCard}>
					<div className={styles.loginLogoBlock}>
						<img src={logoImg} alt="logo" className={styles.loginLogo} />
					</div>
					
					<Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 500 }}>
						Вход
					</Typography>
					
					<Box sx={{ 
						display: 'flex', 
						flexDirection: 'column', 
						gap: 2, 
						width: '100%', 
						maxWidth: 400, 
						alignItems: 'center' 
					}}>
						<TextField
							label='E-mail'
							variant='outlined'
							fullWidth
							type='email'
							autoComplete='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
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
								'& input:-webkit-autofill:hover': {
									WebkitBoxShadow: '0 0 0 1000px white inset !important',
									WebkitTextFillColor: '#333 !important',
									backgroundColor: 'transparent !important',
									backgroundImage: 'none !important',
									backgroundClip: 'content-box !important',
									WebkitBackgroundClip: 'content-box !important',
									color: '#333 !important',
								},
								'& input:-webkit-autofill:focus': {
									WebkitBoxShadow: '0 0 0 1000px white inset !important',
									WebkitTextFillColor: '#333 !important',
									backgroundColor: 'transparent !important',
									backgroundImage: 'none !important',
									backgroundClip: 'content-box !important',
									WebkitBackgroundClip: 'content-box !important',
									color: '#333 !important',
								},
								'& input:-webkit-autofill:active': {
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
							label='Пароль'
							variant='outlined'
							fullWidth
							type={showPassword ? 'text' : 'password'}
							autoComplete='current-password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							InputProps={{
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
								'& input:-webkit-autofill:hover': {
									WebkitBoxShadow: '0 0 0 1000px white inset !important',
									WebkitTextFillColor: '#333 !important',
									backgroundColor: 'transparent !important',
									backgroundImage: 'none !important',
									backgroundClip: 'content-box !important',
									WebkitBackgroundClip: 'content-box !important',
									color: '#333 !important',
								},
								'& input:-webkit-autofill:focus': {
									WebkitBoxShadow: '0 0 0 1000px white inset !important',
									WebkitTextFillColor: '#333 !important',
									backgroundColor: 'transparent !important',
									backgroundImage: 'none !important',
									backgroundClip: 'content-box !important',
									WebkitBackgroundClip: 'content-box !important',
									color: '#333 !important',
								},
								'& input:-webkit-autofill:active': {
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
							fullWidth
							variant='contained'
							onClick={handleSubmit}
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
						
						<Box sx={{ textAlign: 'center', mt: 3 }}>
							<Typography sx={{ fontSize: 14, color: '#666', mb: 1 }}>
								Вы — новый пользователь?{' '}
								<Link to="/register" style={{ color: '#9163FF', textDecoration: 'none', fontWeight: 500 }}>
									Зарегистрироваться
								</Link>
							</Typography>
							<Typography sx={{ fontSize: 14, color: '#666', mb: 1 }}>
								Вы мастер/исполнитель?{' '}
								<Link to="/contractor-register" style={{ color: '#9163FF', textDecoration: 'none', fontWeight: 500 }}>
									Регистрация мастера
								</Link>
							</Typography>
							<Typography sx={{ fontSize: 14, color: '#666' }}>
								Забыли пароль?{' '}
								<Link to="/forgot-password" style={{ color: '#9163FF', textDecoration: 'none', fontWeight: 500 }}>
									Восстановить пароль
								</Link>
							</Typography>
						</Box>
					</Box>
				</div>
			</div>
		</div>
	);
};

export default Login;

