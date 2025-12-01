import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styles from '@pages/login.module.scss';
import logoImg from '@app/assets/logo.png';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSubmitting(true);

		try {
			// TODO: Добавить API вызов для восстановления пароля
			setTimeout(() => {
				setSuccess(true);
				setSubmitting(false);
			}, 1000);
		} catch (err: any) {
			setError(err.message || 'Произошла ошибка при отправке запроса');
			setSubmitting(false);
		}
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
						Восстановление пароля
					</Typography>
					
					{success ? (
						<Box sx={{ 
							display: 'flex', 
							flexDirection: 'column', 
							gap: 2, 
							width: '100%', 
							maxWidth: 400, 
							alignItems: 'center' 
						}}>
							<Alert severity="success" sx={{ width: '100%' }}>
								Инструкции по восстановлению пароля отправлены на ваш email
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
								Вернуться к входу
							</Button>
						</Box>
					) : (
						<>
							<Typography sx={{ textAlign: 'center', mb: 3, color: '#666', fontSize: 14 }}>
								Введите ваш email, и мы отправим инструкции по восстановлению пароля
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
									label='E-mail'
									variant='outlined'
									fullWidth
									type='email'
									autoComplete='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									InputProps={{
										startAdornment: (
											<EmailOutlinedIcon sx={{ mr: 1, color: '#999' }} />
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
									disabled={submitting || !email}
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
									{submitting ? 'Отправка...' : 'Отправить'}
								</Button>
								
								<Box sx={{ textAlign: 'center', mt: 3 }}>
									<Typography sx={{ fontSize: 14, color: '#666' }}>
										Вспомнили пароль?{' '}
										<Link to="/login" style={{ color: '#9163FF', textDecoration: 'none', fontWeight: 500 }}>
											Войти
										</Link>
									</Typography>
								</Box>
							</Box>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;

