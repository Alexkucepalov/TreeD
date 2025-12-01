import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import heartImg from '../app/assets/heart.svg';
import moneyImg from '../app/assets/money_brick.svg';
import speechImg from '../app/assets/speech_bubble_dots.svg';

const Advantages: React.FC = () => {
  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: '#fff', 
      py: { xs: 8, md: 12 },
      mb: '100px',
    }}>
  <Box sx={{  mx: 'auto', px: { xs: 3, md: 4 }, maxWidth: 1314 }}>
        {/* Заголовок и описание */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 8 }, mb: 12, alignItems: { xs: 'center', md: 'flex-start' } }}>
          {/* Левая часть - заголовок */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontWeight: 700,
                color: '#000000',
                fontSize: { xs: 48, md: 48 },
                lineHeight: 1.1,
                textAlign: { xs: 'center', md: 'left' },
                letterSpacing: 0,
              }}
            >
              Мы гарантируем
              <br />
              безопасность
              <br />
              на всех этапах!
            </Typography>
          </Box>
          
          {/* Правая часть - описание */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body1"
              sx={{
                color: '#000000',
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontWeight: 400,
                fontSize: { xs: 16, md: 16 },
                lineHeight: 1.5,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Наша платформа предоставляет все необходимое для воплощения ваших проектов в жизнь с легкостью и уверенностью.
            </Typography>
          </Box>
        </Box>

        {/* Три колонки с преимуществами */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={{ xs: 4, md: 2 }}
          sx={{ alignItems: 'stretch' }}
        >
          {/* Колонка 1 - Проверенные исполнители */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box
              component="img"
              src={heartImg}
              alt="Проверенные исполнители"
              sx={{
                width: { xs: '100%', md: 250 },
                height: { xs: 'auto', md: 250 },
                maxWidth: 250,
                mb: 2,
                objectFit: 'contain',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontWeight: 700,
                color: '#9163FF',
                fontSize: { xs: 32, md: 32 },
                mb: 3,
                textAlign: 'center',
              }}
            >
              Проверенные
              <br />
              исполнители
            </Typography>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: '#000000',
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontWeight: 400,
                  fontSize: { xs: 16, md: 16 },
                  lineHeight: 1.5,
                  textAlign: 'center',
                }}
              >
                Обращайтесь к опытным подрядчикам, которые смогут выполнить ваши проекты в срок и с высоким качеством.
              </Typography>
            </Box>
          </Box>

          {/* Колонка 2 - Безопасная оплата */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box
              component="img"
              src={moneyImg}
              alt="Безопасная оплата"
              sx={{
                width: { xs: '100%', md: 250 },
                height: { xs: 'auto', md: 250 },
                maxWidth: 250,
                mb: 2,
                objectFit: 'contain',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontWeight: 700,
                color: '#9163FF',
                fontSize: { xs: 32, md: 32 },
                mb: 3,
                textAlign: 'center',
              }}
            >
              Безопасная оплата
            </Typography>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: '#000000',
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontWeight: 400,
                  fontSize: { xs: 16, md: 16 },
                  lineHeight: 1.5,
                  textAlign: 'center',
                }}
              >
                Деньги хранятся на специальном счёте и передаются только после того, как клиент подтвердит выполнение работы.
              </Typography>
            </Box>
          </Box>

          {/* Колонка 3 - Чат с исполнителем */}
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box
              component="img"
              src={speechImg}
              alt="Чат с исполнителем"
              sx={{
                width: { xs: '100%', md: 250 },
                height: { xs: 'auto', md: 250 },
                maxWidth: 250,
                mb: 2,
                objectFit: 'contain',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontWeight: 700,
                color: '#9163FF',
                fontSize: { xs: 32, md: 32 },
                mb: 3,
                textAlign: 'center',
              }}
            >
              Чат с исполнителем
            </Typography>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: '#000000',
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontWeight: 400,
                  fontSize: { xs: 16, md: 16 },
                  lineHeight: 1.5,
                  textAlign: 'center',
                }}
              >
                Общайтесь напрямую с исполнителями, делитесь файлами и обсуждайте детали проекта.
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Advantages;