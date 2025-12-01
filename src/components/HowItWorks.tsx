import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import step1Img from '../app/assets/1.png';
import step2Img from '../app/assets/2.png';
import step3Img from '../app/assets/3.png';
import heroImg from '../app/assets/hero.png';
import arrowImg from '../app/assets/arrow.png';
import hero2Img from '../app/assets/hero2.png';
import kitSvg from '../app/assets/kit.svg';

const HowItWorks: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'master'>('customer');

  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: '#fff', 
      pt: { xs: 2, md: 4 },
      pb: { xs: 6, md: 10 },
      px: { xs: 2, md: 4 },
    }}>
      <Box sx={{ 
        maxWidth: 1314, 
        mx: 'auto',
        position: 'relative',
      }}>
        {/* Декоративная картинка справа (кот) */}
        <Box
          component="img"
          src={kitSvg}
          alt="Декоративный кот"
          aria-hidden
          sx={{
            position: 'absolute',
            // Прижимаем максимально к правому краю страницы на десктопе
            right: {
              xs: '0',
              sm: '0',
              md: 'calc(-1 * ((100vw - 1314px) / 2))',
              lg: 'calc(-1 * ((100vw - 1314px) / 2))',
            },
            top: { xs: '0rem', sm: '-0.5rem', md: '-2rem', lg: '-20.5rem' },
            width: { xs: '50vw', sm: '45vw', md: '40vw', lg: '35vw' },
            minWidth: 300,
            maxWidth: 650,
            height: 'auto',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        {/* Заголовок и описание */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          mb: '55px',
        }}>
          <Typography
            sx={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontWeight: 600,
              color: '#000000',
              fontSize: { xs: 40, md: 64 },
              textAlign: 'center',
              lineHeight: { xs: '40px', md: '60.8px' },
              letterSpacing: 0,
            }}
          >
            Как мы работаем
          </Typography>
          
          <Typography
            sx={{
              fontFamily: 'Montserrat, Arial, sans-serif',
              fontWeight: 400,
              color: '#000000',
              fontSize: 16,
              textAlign: 'center',
              maxWidth: '626px',
              letterSpacing: 0,
            }}
          >
            Все просто, мы поможем на каждом этапе!<br />В зависимости от роли в проекте алгоритм действий<br />для
            достижения результата отличается.
          </Typography>

          {/* Кнопки выбора роли */}
          <Box 
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', sm: '464px' },
                height: '45px',
                backgroundColor: '#fff',
                borderRadius: '44.835px',
                display: 'flex',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
              }}
            >
              {/* Левая кнопка - Заказчик */}
              <Box
                onClick={() => setSelectedRole('customer')}
                sx={{
                  flex: 1,
                  backgroundColor: selectedRole === 'customer' ? '#9163ff' : '#fff',
                  color: selectedRole === 'customer' ? '#fff' : '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  borderRadius: selectedRole === 'customer' ? '44.835px' : '44.835px 0 0 44.835px',
                }}
              >
                Заказчик
              </Box>
              
              {/* Правая кнопка - Мастер */}
              <Box
                onClick={() => setSelectedRole('master')}
                sx={{
                  flex: 1,
                  backgroundColor: selectedRole === 'master' ? '#9163ff' : '#fff',
                  color: selectedRole === 'master' ? '#fff' : '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  borderRadius: selectedRole === 'master' ? '44.835px' : '0 44.835px 44.835px 0',
                }}
              >
                Мастер
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Основной контент */}
        <Box sx={{ 
          position: 'relative',
          height: { xs: 'auto', md: '590px' },
        }}>
          {/* Левая часть - фиолетовый блок */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: { xs: '100%', md: '646px' },
              height: { xs: 'auto', md: '590px' },
              borderRadius: '30px',
              boxShadow: '0px 0px 11.3px #72727236',
              background: 'linear-gradient(181deg, rgba(145, 99, 255, 1) 0%, rgba(145, 99, 255, 0.2) 100%)',
              display: 'flex',
              flexDirection: 'column',
              p: { xs: 3, md: 4 },
              zIndex: 1,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontWeight: 700,
                  color: '#ffffff',
                  fontSize: { xs: 28, md: 40 },
                  lineHeight: '38px',
                  letterSpacing: 0,
                }}
              >
                Воплотите идею<br />в жизнь легко
              </Typography>
              
              <Box
                component="img"
                src={arrowImg}
                alt="Иллюстрация"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: { xs: 0, md: '0px' },
                  width: { xs: '100%', md: '500px' },
                  height: { xs: 'auto', md: '500px' },
                  objectFit: 'contain',
                }}
              />

              <Typography
                sx={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontWeight: 500,
                  color: '#ffffff',
                  fontSize: 16,
                  lineHeight: 'normal',
                  letterSpacing: 0,
                  position: 'absolute',
                  top: '150px',
                  width: { xs: 'calc(100% - 40px)', md: '548px' },
                  zIndex: 2,
                }}
              >
                Вы хотите получить качественную 3D-печать без лишних сложностей? Здесь вы можете быстро найти опытного
                исполнителя, который напечатает ваш проект по нужным параметрам и в срок.<br /><br />Просто загрузите
                файл, выберите подходящего мастера из предложенных и контролируйте процесс через удобный сервис.
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  fontWeight: 700,
                  color: '#9163FF',
                  fontSize: 20,
                  textDecoration: 'underline',
                  letterSpacing: 0,
                  position: 'absolute',
                  bottom: '35px',
                  right: '45px',
                  zIndex: 2,
                  cursor: 'pointer',
                }}
              >
                Читать подробнее
              </Typography>
            </Box>
          </Box>

          {/* Правая часть - шаги */}
          <Box sx={{ 
            position: 'absolute',
            top: { xs: '100%', md: 0 },
            right: 0,
            left: { xs: 0, md: '664px' },
            mt: { xs: 4, md: 0 },
          }}>
            {/* Шаг 1 */}
            <Box
              sx={{
                width: '100%',
                maxWidth: '650px',
                height: { xs: 'auto', md: '180px' },
                backgroundColor: '#ffffff',
                borderRadius: '30px',
                boxShadow: '0px 0px 11.3px #72727236',
                display: 'flex',
                alignItems: 'center',
                gap: '25px',
                p: { xs: 2, md: 3 },
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: '173px',
                  height: { xs: 'auto', md: '152px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={step1Img}
                  alt="Шаг 1"
                  sx={{
                    width: { xs: '60px', md: '83px' },
                    height: { xs: 'auto', md: '154px' },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, Arial, sans-serif',
                    fontWeight: 700,
                    color: '#9163FF',
                    fontSize: { xs: 20, md: 28 },
                    lineHeight: 'normal',
                    letterSpacing: 0,
                    mb: '14px',
                  }}
                >
                  {selectedRole === 'customer' ? 'Создание заказа' : 'Выбор заказа'}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, Arial, sans-serif',
                    fontWeight: 400,
                    color: '#000000',
                    fontSize: { xs: 14, md: 16 },
                    lineHeight: 'normal',
                    letterSpacing: 0,
                  }}
                >
                  {selectedRole === 'customer' 
                    ? 'С использованием специализированной формы вы сможете без затруднений оформить техническое задание на изготовление объекта'
                    : 'После заполнения портфолио, вы можете выбрать заказ, изготовление которого вам понравиться'}
                </Typography>
              </Box>
            </Box>

            {/* Шаг 2 */}
            <Box
              sx={{
                width: '100%',
                maxWidth: '650px',
                height: { xs: 'auto', md: '180px' },
                backgroundColor: '#ffffff',
                borderRadius: '30px',
                boxShadow: '0px 0px 11.3px #72727236',
                display: 'flex',
                alignItems: 'center',
                gap: '25px',
                p: { xs: 2, md: 3 },
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: '165px',
                  height: { xs: 'auto', md: '151px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={step2Img}
                  alt="Шаг 2"
                  sx={{
                    width: { xs: '60px', md: '136px' },
                    height: { xs: 'auto', md: '152px' },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, Arial, sans-serif',
                    fontWeight: 700,
                    color: '#9163FF',
                    fontSize: { xs: 20, md: 28 },
                    lineHeight: 'normal',
                    letterSpacing: 0,
                    mb: '14px',
                  }}
                >
                  {selectedRole === 'customer' ? 'Выбор исполнителя' : 'Предложение цены'}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, Arial, sans-serif',
                    fontWeight: 400,
                    color: '#000000',
                    fontSize: { xs: 14, md: 16 },
                    lineHeight: 'normal',
                    letterSpacing: 0,
                  }}
                >
                  {selectedRole === 'customer'
                    ? 'После публикации заказа к вам начнут обращаться исполнители. Вам останется только выбрать подходящий вариант по цене и срокам.'
                    : 'После выбранного заказа, согласуйте с заказчиком сроки и оплату, и приступайте к работе'}
                </Typography>
              </Box>
            </Box>

            {/* Шаг 3 */}
            <Box
              sx={{
                width: '100%',
                maxWidth: '650px',
                height: { xs: 'auto', md: '180px' },
                backgroundColor: '#ffffff',
                borderRadius: '30px',
                boxShadow: '0px 0px 11.3px #72727236',
                display: 'flex',
                alignItems: 'center',
                gap: '25px',
                p: { xs: 2, md: 3 },
              }}
            >
              <Box
                sx={{
                  width: '165px',
                  height: { xs: 'auto', md: '151px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={step3Img}
                  alt="Шаг 3"
                  sx={{
                    width: { xs: '60px', md: '129px' },
                    height: { xs: 'auto', md: '151px' },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, Arial, sans-serif',
                    fontWeight: 700,
                    color: '#9163FF',
                    fontSize: { xs: 20, md: 28 },
                    lineHeight: 'normal',
                    letterSpacing: 0,
                    mb: '14px',
                  }}
                >
                  {selectedRole === 'customer' ? 'Оплата и получение' : 'Передача заказа'}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat, Arial, sans-serif',
                    fontWeight: 400,
                    color: '#000000',
                    fontSize: { xs: 14, md: 16 },
                    lineHeight: 'normal',
                    letterSpacing: 0,
                  }}
                >
                  {selectedRole === 'customer'
                    ? 'После подтверждения сделки обеими сторонами происходит оплата. Вы сами выбираете: забрать товар или заказать доставку.'
                    : 'После завершения сделки, происходит оплата, по согласованию с заказчиком принимается решение о доставке'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HowItWorks;