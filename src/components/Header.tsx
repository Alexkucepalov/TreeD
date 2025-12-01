import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Button, Container, Stack, Box, Typography, useTheme, Drawer, List, ListItem, ListItemText } from "@mui/material";
import logo from '../app/assets/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
 
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logoutUserGet } from '@features/auth/api/authActions';
import { useNavigate } from 'react-router-dom';

// Добавляем глобальный стиль для плавной прокрутки
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth';
}

const navLinks = [
  { label: "Мастерская", href: "#workshop" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Новости", href: "#news" },
  { label: "Регистрация", href: "/register" },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthChecked } = useAppSelector(state => state.auth);

  // Логирование состояния авторизации
  console.log('Header: Auth state:', { user, isAuthChecked });
  console.log('Header: User exists:', !!user);
  console.log('Header: Auth checked:', isAuthChecked);
  console.log('Header: Should show logout:', isAuthChecked && user);
  console.log('Header: Access token in localStorage:', localStorage.getItem('accessToken'));
  console.log('Header: Refresh token in localStorage:', localStorage.getItem('refreshToken'));

  // Обработчик выхода из системы
  const handleLogout = async () => {
    try {
      console.log('Header: Starting logout with GET /logout');
      await dispatch(logoutUserGet()).unwrap();
      console.log('Header: Logout successful, navigating to home');
      navigate('/');
    } catch (error) {
      console.error('Header: Ошибка при выходе из системы:', error);
      // Даже если произошла ошибка, перенаправляем на главную страницу
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        py: '30px', // 30px отступ сверху и снизу
        bgcolor: '#fff',
        position: 'relative',
        zIndex: 1000,
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ px: { xs: 2, md: 6 } }}>
        <Toolbar disableGutters sx={{ minHeight: 'auto', px: 0, display: 'flex', gap: { xs: 2, md: 4 } }}>
          {/* Логотип */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120, textDecoration: 'none' }}>
            <Box
              component="img"
              src={logo}
              alt="TreeD logo"
              sx={{ height: 40, width: 120, mr: 1, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
            />
          </a>
          
          {/* Поиск удалён по требованию */}

          {/* Навигация для десктопа */}
          <Stack
            direction="row"
            spacing={{ xs: 2, md: 4 }}
            alignItems="center"
            sx={{ ml: "auto", mr: 2, display: { xs: "none", md: "flex" } }}
          >
            {navLinks.map((link) => (
              <Typography
                key={link.label}
                component="a"
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  if (link.href.startsWith('#')) {
                    const el = document.querySelector(link.href);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    navigate(link.href);
                  }
                }}
                sx={{
                  color: "#000",
                  fontWeight: 500,
                  fontSize: 16,
                  textDecoration: "none",
                  letterSpacing: 0,
                  fontFamily: 'Montserrat',
                  textTransform: 'none',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  transition: "background 0.2s, color 0.2s",
                  '&:hover, &:focus': {
                    background: 'rgba(145, 99, 255, 0.1)',
                    color: "#9163FF",
                  },
                }}
                tabIndex={0}
                aria-label={link.label}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>
          {/* Кнопка Войти/Выход */}
          {isAuthChecked && user ? (
            <Button
              variant="contained"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                borderRadius: 20,
                backgroundColor: "#9163FF",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                textTransform: "none",
                boxShadow: "none",
                fontFamily: 'Montserrat',
                transition: "background 0.2s, color 0.2s",
                ml: { xs: 1, md: 2 },
                px: 3,
                py: 1,
                '&:hover, &:focus': {
                  backgroundColor: "#7B4FE8",
                  boxShadow: "0 4px 12px rgba(145, 99, 255, 0.3)",
                },
              }}
              aria-label="Выйти"
            >
              Выход
            </Button>
          ) : (
                   <Button
                     variant="contained"
                     onClick={() => navigate('/login')}
                     startIcon={<PersonIcon />}
                     sx={{
                       width: 190,
                       height: 44,
                       borderRadius: 20,
                       backgroundColor: "#9163FF",
                       color: "#FFFFFF",
                       fontWeight: 500,
                       fontSize: 18,
                       textTransform: "none",
                       boxShadow: "none",
                       fontFamily: 'Montserrat',
                       transition: "background 0.2s, color 0.2s",
                       ml: { xs: 1, md: 2 },
                       '&:hover, &:focus': {
                         backgroundColor: "#7B4FE8",
                         boxShadow: "0 4px 12px rgba(145, 99, 255, 0.3)",
                       },
                     }}
                     aria-label="Войти"
                   >
                     Войти
                   </Button>
          )}
          {/* Бургер-меню для мобильных */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "flex", md: "none" }, ml: 2, color: '#000' }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{ sx: { bgcolor: 'rgba(145, 99, 255, 0.95)', color: '#fff', width: 260, borderTopLeftRadius: 32, borderBottomLeftRadius: 32 } }}
          >
            <List>
              {navLinks.map((link) => (
                <ListItem 
                  key={link.label} 
                  component="a" 
                  href={link.href} 
                  onClick={(e) => {
                    e.preventDefault();
                    setDrawerOpen(false);
                    if (link.href.startsWith('#')) {
                      const el = document.querySelector(link.href);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      navigate(link.href);
                    }
                  }}
                >
                  <ListItemText primary={link.label} sx={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: 18 }} />
                </ListItem>
              ))}
              {isAuthChecked && user ? (
                <ListItem 
                  component="button" 
                  onClick={() => {
                    setDrawerOpen(false);
                    handleLogout();
                  }}
                  sx={{ 
                    border: 'none', 
                    background: 'transparent', 
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    padding: '16px'
                  }}
                >
                  <LogoutIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Выход" sx={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: 18 }} />
                </ListItem>
              ) : (
                <ListItem 
                  component="button" 
                  onClick={() => {
                    setDrawerOpen(false);
                    navigate('/login');
                  }}
                  sx={{ 
                    border: 'none', 
                    background: 'transparent', 
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    padding: '16px'
                  }}
                >
                  <PersonIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Войти" sx={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: 18 }} />
                </ListItem>
              )}
            </List>
          </Drawer>
        </Toolbar>
      </Container>
    </Box>
  );
};

export default Header;
