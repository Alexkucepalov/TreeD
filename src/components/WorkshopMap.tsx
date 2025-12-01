import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import mapImg from '../app/assets/maps.png';
import keySvg from '../app/assets/key.svg';

const WorkshopMap: React.FC = () => (
  <Box id="workshop" sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#232323', my: 8, mb: '200px', position: 'relative' }}>
    <Typography sx={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 600, fontSize: 48, mb: 1 }}>Мастерская</Typography>
    <Typography sx={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 400, fontSize: 16, textAlign: 'center', mb: 5 }}>
      Профессиональный ремонт и обслуживание 3D-принтеров.
      <br />Вернём ваше оборудование к жизни быстро и с гарантией.
    </Typography>
    <Box sx={{ position: 'relative', width: 1311, height: 650, bgcolor: '#fff', borderRadius: '24px', boxShadow: '0 10px 30px rgba(124,92,250,0.10)' }}>
      {/* Фото карты */}
      <Box sx={{ position: 'absolute', top: 24, left: 30, width: 1251, height: 353, borderRadius: '18px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <img src={mapImg} alt="Карта мастерской" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </Box>

      {/* Левый блок заголовка под фото */}
      <Box sx={{ position: 'absolute', left: 30, top: 24 + 353 + 25 }}>
        <Typography sx={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 600, fontSize: 44, lineHeight: 1.1 }}>
          Возник вопрос?
          <br />Мы проконсультируем!
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 3,
            borderRadius: 24,
            background: '#9163FF',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            px: 4,
            py: 1.2,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { background: '#5B4C9D' },
          }}
        >
          Записаться
        </Button>
      </Box>

      {/* Правый информационный блок */}
      <Box sx={{ position: 'absolute', right: 140, top: 24 + 353 + 25, maxWidth: 420 }}>
        <Typography sx={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 500, fontSize: 24, color: '#9163FF', mb: 1.5 }}>
          г Волгоград, пр-кт им. В.И. Ленина, д. 94, офис 241
        </Typography>
        <Typography sx={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 400, fontSize: 15, color: '#232323', mb: 3 }}>
          Ремонтируем и обслуживанем 3D-принтеры
          <br />Всегда поможем, поделимся опытом и дадим совет. Все в одном месте!
        </Typography>
        <Button
          variant="outlined"
          sx={{
            mt: 1,
            borderRadius: 24,
            border: '2px solid #9163FF',
            color: '#9163FF',
            fontWeight: 700,
            fontSize: 16,
            px: 4,
            py: 1.1,
            textTransform: 'none',
            '&:hover': { background: '#F3F0FF', color: '#9163FF' },
          }}
          onClick={() => window.open('https://yandex.ru/maps/?rtext=~Волгоград,+проспект имени В.И. Ленина,+94,+офис 241', '_blank')}
        >
          Построить маршрут
        </Button>
      </Box>
      
      {/* Декоративный ключ справа от блока мастерской */}
      <Box
        component="img"
        src={keySvg}
        alt=""
        aria-hidden
        sx={{
          position: 'absolute',
          right: 'calc(-1 * ((100vw - 1311px) / 2))',
          top: '20%',
          transform: 'translateY(-50%)',
          width: { xs: '45vw', md: '40vw', lg: '35vw' },
          minWidth: 300,
          maxWidth: 650,
          height: 'auto',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
    </Box>
  </Box>
);

export default WorkshopMap;
