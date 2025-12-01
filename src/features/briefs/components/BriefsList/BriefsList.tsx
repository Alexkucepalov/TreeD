import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
} from '@mui/material';
import styles from './BriefsList.module.scss';
import { Chips } from '@components/ui';
import clockIcon from '@app/assets/icon/clock.svg';
import starIcon from '@app/assets/icon/star.svg';
import avatarImage from '@app/assets/icon/avatar.svg';
import briefImage from '@app/assets/brif.png';

interface Brief {
  id: number;
  title: string;
  description: string;
  price: string;
  deadline: string;
  provider: {
    name: string;
    avatar?: string;
    initial?: string;
    rating: number;
    reviews: number;
    isOnline: boolean;
  };
  tags: string[];
  image?: string;
}

interface BriefsListProps {
  filters?: any;
}

const BriefsList: React.FC<BriefsListProps> = ({ filters }) => {
  const [sortBy, setSortBy] = useState<string>('по дате');

  const briefs: Brief[] = [
    {
      id: 1,
      title: 'Напечатать аниме-фигурку по готовой модельке',
      description: 'Печатаю ABS/PETG, опыт 5 лет. Краткая самопрезентация: имя/ник, фото, рейтинг, регион, выбранные теги. Краткая самопрезентация: имя/ник, фото, рейтинг, регион, выбранные теги.',
      price: '45 000₽',
      deadline: '7 дней',
      provider: {
        name: 'Строитель Оффлайн',
        avatar: avatarImage,
        rating: 4.9,
        reviews: 13,
        isOnline: true,
      },
      tags: ['chips', 'chips', 'chips'],
    },
    {
      id: 2,
      title: 'Напечатать аниме-фигурку по готовой модельке',
      description: 'Печатаю ABS/PETG, опыт 5 лет. Краткая самопрезентация: имя/ник, фото, рейтинг, регион, выбранные теги.',
      price: '45 000₽',
      deadline: '7 дней',
      provider: {
        name: 'Строитель Оффлайн',
        avatar: avatarImage,
        rating: 4.9,
        reviews: 13,
        isOnline: true,
      },
      tags: ['chips', 'chips', 'chips'],
      image: briefImage,
    },
    {
      id: 3,
      title: 'Напечатать аниме-фигурку по готовой модельке',
      description: 'Печатаю ABS/PETG, опыт 5 лет. Краткая самопрезентация: имя/ник, фото, рейтинг, регион, выбранные теги.',
      price: '45 000₽',
      deadline: '7 дней',
      provider: {
        name: 'Строитель Оффлайн',
        avatar: avatarImage,
        rating: 4.9,
        reviews: 13,
        isOnline: true,
      },
      tags: ['chips', 'chips', 'chips'],
      image: briefImage,
    },
    {
      id: 4,
      title: 'Напечатать аниме-фигурку по готовой модельке',
      description: 'Печатаю ABS/PETG, опыт 5 лет. Краткая самопрезентация: имя/ник, фото, рейтинг, регион, выбранные теги.',
      price: '45 000₽',
      deadline: '7 дней',
      provider: {
        name: 'Строитель Оффлайн',
        avatar: avatarImage,
        rating: 4.9,
        reviews: 13,
        isOnline: true,
      },
      tags: ['chips', 'chips', 'chips'],
      image: briefImage,
    },
  ];

  return (
    <Box className={styles.briefsListContainer}>
      <Box className={styles.header}>
        <Typography 
          className={styles.title} 
          variant="h3"
          sx={{
            fontFamily: '"Montserrat-Bold", sans-serif',
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: '95%',
            color: '#000000',
          }}
        >
          Актуальные брифы
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {['по дате', 'по цене', 'по рейтингу'].map((option) => (
            <Button
              key={option}
              onClick={() => setSortBy(option)}
              variant={sortBy === option ? 'contained' : 'outlined'}
              sx={{
                borderRadius: '30px',
                height: '31px',
                padding: '5px 25px',
                fontFamily: '"Montserrat-Medium", sans-serif',
                fontSize: '16px',
                textTransform: 'none',
                backgroundColor: sortBy === option ? '#9163ff' : 'transparent',
                color: sortBy === option ? '#ffffff' : '#c4c4c4',
                borderColor: sortBy === option ? '#9163ff' : '#c4c4c4',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: sortBy === option ? '#5B4C9D' : 'rgba(145, 99, 255, 0.1)',
                  borderColor: sortBy === option ? '#5B4C9D' : '#9163ff',
                  color: sortBy === option ? '#ffffff' : '#9163ff',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {option}
            </Button>
          ))}
        </Box>
      </Box>

      <Box className={styles.briefsGrid}>
        {briefs.map((brief) => (
          <Card
            key={brief.id}
            sx={{
              borderRadius: '20px',
              boxShadow: '0px 0px 11.3px 0px rgba(115, 115, 115, 0.21)',
              display: 'flex',
              flexDirection: brief.image ? 'row' : 'column',
              gap: brief.image ? '20px' : '6px',
              padding: '20px',
              minHeight: '200px',
              height: 'auto',
              width: '100%',
              position: 'relative',
              zIndex: 1,
              backgroundColor: '#ffffff',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0px 0px 20px 0px rgba(115, 115, 115, 0.3)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            {brief.image && (
              <Box
                component="img"
                src={brief.image}
                alt={brief.title}
                sx={{
                  borderRadius: '10px',
                  width: '250px',
                  minWidth: '250px',
                  height: 'auto',
                  maxHeight: '100%',
                  objectFit: 'cover',
                  alignSelf: 'stretch',
                }}
              />
            )}
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                flex: 1,
                padding: '0 !important',
                position: 'relative',
                justifyContent: 'space-between',
                '&:last-child': {
                  paddingBottom: '0',
                },
              }}
            >
              {/* Верхняя часть: теги слева, цена/дедлайн справа */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flex: 1, alignItems: 'flex-start' }}>
                  {brief.tags.map((tag, index) => (
                    <Chips key={index} color="purple" size="small">
                      {tag}
                    </Chips>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '4px',
                    marginLeft: '10px',
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Montserrat-Medium", sans-serif',
                      fontSize: '24px',
                      fontWeight: 500,
                      lineHeight: '100%',
                    }}
                  >
                    {brief.price}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Typography
                      sx={{
                        color: '#c4c4c4',
                        fontFamily: '"Montserrat-Medium", sans-serif',
                        fontSize: '16px',
                      }}
                    >
                      {brief.deadline}
                    </Typography>
                    <Box
                      component="img"
                      src={clockIcon}
                      alt="Clock"
                      sx={{ width: '17px', height: '17px' }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Средняя часть: заголовок и описание */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minHeight: 0 }}>
                <Typography
                  sx={{
                    fontFamily: '"Montserrat-Medium", sans-serif',
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: '120%',
                    color: '#000000',
                  }}
                >
                  {brief.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#727986',
                    fontFamily: '"Montserrat-Regular", sans-serif',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    flex: 1,
                  }}
                >
                  {brief.description}
                </Typography>
              </Box>

              {/* Нижняя часть: провайдер слева, кнопка справа */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', width: '100%' }}>
                <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Box sx={{ position: 'relative' }}>
                    <Avatar
                      src={brief.provider.avatar}
                      sx={{
                        width: '30px',
                        height: '30px',
                        bgcolor: '#222222',
                      }}
                    >
                      {brief.provider.initial}
                    </Avatar>
                    {brief.provider.isOnline && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: '5px',
                          height: '5px',
                          bgcolor: '#4dca53',
                          borderRadius: '50%',
                          border: '2px solid white',
                        }}
                      />
                    )}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: '"Montserrat-Medium", sans-serif',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#000000',
                        lineHeight: '1.2',
                      }}
                    >
                      {brief.provider.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px', marginTop: '2px' }}>
                      <Box
                        component="img"
                        src={starIcon}
                        alt="Star"
                        sx={{ width: '14px', height: '14px' }}
                      />
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: '"Montserrat-Medium", sans-serif',
                          fontSize: '12px',
                          color: '#727986',
                        }}
                      >
                        {brief.provider.rating}
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: '"Montserrat-Medium", sans-serif',
                          fontSize: '12px',
                          color: '#c4c4c4',
                        }}
                      >
                        {' '}({brief.provider.reviews})
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#9163ff',
                    borderRadius: '30px',
                    height: '31px',
                    padding: '5px 20px',
                    fontFamily: '"Montserrat-Medium", sans-serif',
                    fontSize: '16px',
                    textTransform: 'none',
                    flexShrink: 0,
                    '&:hover': {
                      backgroundColor: '#5B4C9D',
                    },
                  }}
                >
                  откликнуться
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default BriefsList;

