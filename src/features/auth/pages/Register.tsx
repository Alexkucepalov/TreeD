import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Alert, Stack, IconButton, InputAdornment, Box, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from '@pages/login.module.scss';
import { useAppDispatch } from '@store/hooks';
import { registerShopAccount } from '@shared/utils/api';
import type { ShopRegisterPayload } from '@shared/types';
import logoImg from '@app/assets/logo.png';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Стили для исправления автозаполнения
  const autofillStyles = {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword || !agree) return;

    setSubmitting(true);
    try {
      const payload: ShopRegisterPayload = {
        fio: name, // Сервер требует поле fio
        nickname: name,
        email,
        password,
        password_confirmation: confirmPassword,
        role: 'customer',
        can_model: false,
        can_print: false,
        printing_experience: 'under_1_year',
        modeling_experience: 'under_1_year',
        cad_ids: [],
        city_id: 1,
        printing_direction_ids: [],
        modeling_direction_ids: [],
        equipments: []
      };

      await registerShopAccount(payload);
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 2000);
    } catch (err: any) {
      console.error('Registration error details:', err);
      let errorMessage = err.message || 'Ошибка регистрации';
      
      if (err.details) {
        console.error('Error details:', err.details);
        if (err.details.errors) {
          const validationErrors = Object.entries(err.details.errors)
            .map(([field, messages]: [string, any]) => {
              const fieldName = field === 'email' ? 'Email' : 
                               field === 'password' ? 'Пароль' : 
                               field === 'nickname' ? 'Имя' : 
                               field === 'fio' ? 'ФИО' : field;
              const msgs = Array.isArray(messages) ? messages : [messages];
              return `${fieldName}: ${msgs.join(', ')}`;
            })
            .join('\n');
          if (validationErrors) {
            errorMessage = validationErrors;
          }
        }
      }
      
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const isPasswordMatch = password === confirmPassword;
  const isFormValid = name && email && password && confirmPassword && isPasswordMatch && agree;

  return (
    <div>
      <div className={styles.loginBg} />
      <div className={styles.loginPageWrapper}>
        <div className={styles.loginCard}>
          <div className={styles.loginLogoBlock}>
            <img src={logoImg} alt="logo" className={styles.loginLogo} />
          </div>
          
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 500 }}>
            Регистрация
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Регистрация успешна. Перенаправляем...
            </Alert>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2, 
            width: '100%', 
            maxWidth: 400, 
            alignItems: 'center' 
          }}>
            <TextField
              label='Имя'
              variant='outlined'
              fullWidth
              type='text'
              autoComplete='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={autofillStyles}
            />
            <TextField
              label='E-mail'
              variant='outlined'
              fullWidth
              type='email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={autofillStyles}
            />
            <TextField
              label='Пароль'
              variant='outlined'
              fullWidth
              type={showPassword ? 'text' : 'password'}
              autoComplete='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={autofillStyles}
            />
            <TextField
              label='Подтвердите пароль'
              variant='outlined'
              fullWidth
              type={showPassword ? 'text' : 'password'}
              autoComplete='new-password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={confirmPassword !== '' && !isPasswordMatch}
              helperText={confirmPassword !== '' && !isPasswordMatch ? 'Пароли не совпадают' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={autofillStyles}
            />
            
            <FormControlLabel
              control={<Checkbox checked={agree} onChange={e => setAgree(e.target.checked)} color="primary" />}
              label="Я согласен на обработку персональных данных"
            />
            
            <Button
              fullWidth
              variant='contained'
              onClick={handleSubmit}
              disabled={!isFormValid || submitting}
              sx={{
                mt: 1,
                py: 1.5,
                fontSize: '16px',
                fontWeight: 500,
                borderRadius: 2,
                textTransform: 'none',
                background: '#9163FF',
                '&:hover': { background: '#5B4C9D' },
                '&:disabled': {
                  background: '#ccc',
                  color: '#666'
                }
              }}
            >
              {submitting ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography sx={{ fontSize: 14, color: '#666', mb: 1 }}>
                Уже зарегистрированы?{' '}
                <Link to="/login" style={{ color: '#9163FF', textDecoration: 'none', fontWeight: 500 }}>
                  Войти
                </Link>
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#666' }}>
                Вы мастер/исполнитель?{' '}
                <Link to="/contractor-register" style={{ color: '#9163FF', textDecoration: 'none', fontWeight: 500 }}>
                  Регистрация мастера
                </Link>
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Register;

