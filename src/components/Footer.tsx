import React from 'react';
import { Box, Typography, Stack, Button, Container, Link } from '@mui/material';
import logoSmall from '../app/assets/logo.svg';
import logoBig from '../app/assets/logobig.svg';

const Footer: React.FC = () => (
  <Box
    sx={{
      width: '100%',
      bgcolor: '#9163FF',
      color: '#fff',
      py: { xs: 6, md: 8 },
      px: { xs: 2, md: 6 },
      borderTopLeftRadius: { xs: 0, md: '40px' },
      borderTopRightRadius: { xs: 0, md: '40px' },
      boxShadow: '0 -4px 24px 0 rgba(124,92,250,0.10)',
      fontFamily: 'Montserrat',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Убираем фоновое изображение. Ниже добавлен самостоятельный блок TREED */}
    {/* Декоративные точки справа */}
    <Box sx={{ position: 'absolute', top: { xs: 24, md: 40 }, right: { xs: 24, md: 48 }, display: 'flex', gap: { xs: 2, md: 3 }, zIndex: 1 }}>
      {[0,1,2].map((i) => (
        <Box key={i} sx={{ width: { xs: 28, md: 36 }, height: { xs: 28, md: 36 }, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.75)' }} />
      ))}
    </Box>
    <Container maxWidth="xl" sx={{ px: 0 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 4, md: 8 }}
        sx={{
          width: '100%',
          maxWidth: 1700,
          mx: 'auto',
          gap: { xs: 4, md: 8 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Логотип и описание */}
        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>

          </Stack>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: 24, md: 28 },
              lineHeight: 1.2,
              mb: 2,
              color: '#fff',
            }}
          >
            Больше, чем 3D-печать
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              lineHeight: 1.6,
              mb: 3,
              opacity: 0.95,
              color: '#fff',
              maxWidth: 360,
            }}
          >
            Мы соединяем заказчиков
            <br />
            и исполнителей, делая создание
            <br />
            уникальных объектов простым
            <br />
            и безопасным.
          </Typography>
        </Box>

        {/* Навигация */}
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: 18, md: 20 },
              mb: 3,
              color: '#fff',
            }}
          >
            Навигация
          </Typography>
          <Stack spacing={2}>
            {[
              { label: 'Тарифы', href: '#pricing' },
              { label: 'Мастерская', href: '#workshop' },
              { label: 'Новости', href: '#news' },
              { label: 'О нас', href: '#about' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                sx={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: { xs: 16, md: 18 },
                  opacity: 0.9,
                  transition: 'opacity 0.2s',
                  '&:hover': {
                    opacity: 1,
                    color: '#fff',
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Box>

        {/* Контакты */}
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: 18, md: 20 },
              mb: 3,
              color: '#fff',
            }}
          >
            Контакты
          </Typography>
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 16, opacity: 0.9, color: '#fff' }}>
              г. Волгоград, ул. Пражская, 17
            </Typography>
            <Typography sx={{ fontSize: 16, opacity: 0.9, color: '#fff' }}>
              +7 (970) 999 99 99
            </Typography>
            <Typography sx={{ fontSize: 16, opacity: 0.9, color: '#fff' }}>
              info@treed.ru
            </Typography>
          </Stack>
        </Box>

        {/* Пустая колонка под декоративные элементы (по макету) */}
        <Box sx={{ flex: 1, minWidth: 200 }} />
      </Stack>

      {/* Большой белый блок-надпись TREED (SVG), позиционируем как в макете */}
      <Box
        component="img"
        src={logoBig}
        alt="TREED"
        aria-hidden
        sx={{
          position: 'absolute',
          left: { xs: '-6%', md: '-2%' },
          bottom: { xs: '-10px', md: '-12px' },
          width: 1535,
          height: 240,
          userSelect: 'none',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Нижняя часть футера */}
      <Box
        sx={{
          mt: 30,
          pt: { xs: 1, md: 2 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 14, md: 16 },
            opacity: 0.8,
            color: '#fff',
            display: 'none',
          }}
        >
          © 2024 TreeD Все права защищены
        </Typography>
      </Box>

      {/* Блок ссылок и копирайта справа под точками */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 24, md: 48 },
          top: { xs: 80, md: 500 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: { xs: 1, md: 1.25 },
          zIndex: 2,
        }}
      >
        <Link
          href="#terms"
          sx={{ 
            color: '#fff', 
            textDecoration: 'none', 
            opacity: 0.9, 
            fontSize: { xs: 14, md: 16 },
            textAlign: 'right',
            '&:hover': { opacity: 1 } 
          }}
        >
          Условия использования
        </Link>
        <Link
          href="#privacy"
          sx={{ 
            color: '#fff', 
            textDecoration: 'none', 
            opacity: 0.9, 
            fontSize: { xs: 14, md: 16 },
            textAlign: 'right',
            '&:hover': { opacity: 1 } 
          }}
        >
          Политика конфиденциальности
        </Link>
        <Typography sx={{ 
          fontSize: { xs: 14, md: 16 }, 
          opacity: 0.8, 
          color: '#fff',
          textAlign: 'right'
        }}>
          © 2024 TreeD Все права защищены
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer; 