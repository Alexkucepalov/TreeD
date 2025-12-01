import React from 'react';
import { Box, Typography, Stack, Link } from '@mui/material';
import shipSvg from '../app/assets/ship.svg';
import kitSvg from '../app/assets/kit.svg';

const Description3DPrint: React.FC = () => (
  <Box sx={{ 
    width: '100%', 
    bgcolor: '#fff', 
    pt: { xs: 2, md: 4 },
    pb: { xs: 2, md: 4 },
  }}>
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      spacing={{ xs: 4, md: 8 }}
      sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 4 } }}
    >
      {/* Левая часть - только кораблик */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: 400, md: 900 },
          height: { xs: 400, md: 900 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={shipSvg}
          alt="3D корабль"
          sx={{
            width: { xs: 400, md: 800 },
            height: { xs: 400, md: 800 },
          }}
        />
      </Box>

      {/* Правая часть - текст */}
      <Box sx={{ maxWidth: { xs: '100%', md: 600 }, textAlign: 'left' }}>
        <Box sx={{ width: 680, height: 184 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontWeight: 700,
              mb: 0,
              fontSize: { xs: 36, md: 36 },
              lineHeight: 1.2,
              textAlign: 'left',
            }}
          >
            <Box component="span" sx={{ color: '#9163FF' }}>
              3D-печать
            </Box>
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontWeight: 700,
              mb: 0,
              fontSize: { xs: 36, md: 36 },
              lineHeight: 1.2,
              textAlign: 'left',
              color: '#1E1E1E',
            }}
          >
            — это когда по цифровой
            <br />
            модели слой за слоем
            <br />
            создают реальные вещи
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: '#000000',
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontWeight: 400,
            fontSize: { xs: 20, md: 20 },
            lineHeight: 1.6,
            mb: 0,
            mt: '25px',
          }}
        >
          Так можно быстро делать прототипы, индивидуальные имплантаты, модели зданий, восстанавливать сломанные детали, а ещё создавать уникальные предметы интерьера, игрушки, аксессуары и кастомные запчасти.
        </Typography>
        <Link
          href="#learn-more"
          sx={{
            color: '#9163FF',
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontWeight: 700,
            fontSize: 24,
            textDecoration: 'underline',
            textDecorationColor: '#9163FF',
            textUnderlineOffset: 4,
            transition: 'color 0.2s',
            display: 'inline-block',
            mt: '25px',
            '&:hover': {
              color: '#7B4FE8',
              textDecorationColor: '#7B4FE8',
            },
          }}
        >
          Узнать подробнее
        </Link>
      </Box>
    </Stack>
  </Box>
);

export default Description3DPrint;
