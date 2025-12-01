import React, { useMemo, useState } from 'react';
import { Box, Typography, Stack, Card, CardContent, CardMedia } from '@mui/material';
import { layout } from '../theme';
import downArrow from '../app/assets/downarrow.svg';

type Performer = {
  type: 'Прототип' | 'Макет' | 'Детали';
  title: string;
  author: string;
  rating: number;
  image: any;
  description: string;
};

const performers: Performer[] = [
  {
    type: 'Макет',
    title: 'Working Trebuchet',
    author: 'Brr Brr Patapim',
    rating: 4.9,
    image: require('../app/assets/executor1.png'), // trebuchet
    description: 'Рабочий макет требушета — функциональная модель для запуска небольших снарядов.',
  },
  {
    type: 'Макет',
    title: 'Mini Vader Figurine',
    author: 'Denchik Slazit',
    rating: 5.0,
    image: require('../app/assets/executor2.png'), // vader
    description: 'Миниатюрная фигурка Вейдера — идеальный сувенир для фанатов, выполненный с высокой детализацией.',
  },
  {
    type: 'Детали',
    title: 'Screw Claw',
    author: 'Drizlo Baam',
    rating: 4.7,
    image: require('../app/assets/executor3.png'), // screw claw
    description: 'Screw Claw — насадка для удобного удержания шурупов перед закручиванием. Упрощает работу одной рукой.',
  },
];

const BestPerformers: React.FC = () => {
  const [filter, setFilter] = useState<'Все услуги' | 'Прототипы' | 'Макеты' | 'Детали'>('Все услуги');

  const filtered = useMemo(() => {
    switch (filter) {
      case 'Прототипы':
        return performers.filter((p) => p.type === 'Прототип');
      case 'Макеты':
        return performers.filter((p) => p.type === 'Макет');
      case 'Детали':
        return performers.filter((p) => p.type === 'Детали');
      default:
        // «Все услуги» — показываем максимум 3 карточки в ряд и в выборке
        return performers.slice(0, 3);
    }
  }, [filter]);
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: layout.sectionMaxWidth,
        mx: 'auto',
        mt: 6,
        mb: '150px',
        px: layout.sectionPaddingX,
        py: layout.sectionPaddingY,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'transparent',
        color: '#232323',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Montserrat, Arial, sans-serif',
          fontWeight: 700,
          color: '#000000',
          fontSize: 48,
          letterSpacing: 0,
          lineHeight: '45.6px',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          mb: '25px',
        }}
      >
        Лучшие исполнители
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'Montserrat, Arial, sans-serif',
          fontWeight: 400,
          fontSize: 16,
          textAlign: 'center',
          mb: 4,
          maxWidth: 1420,
        }}
      >
        Изучите портфолио исполнителей, их опыт
        <br />
        и отзывы, чтобы выбрать наиболее подходящего для вашего проекта.
      </Typography>
      {/* Переключатель категорий (как в Как мы работаем) */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 680,
            height: 45,
            backgroundColor: '#fff',
            borderRadius: '44.835px',
            display: 'flex',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {(['Все услуги', 'Прототипы', 'Макеты', 'Детали'] as const).map((label, idx) => {
            const active = filter === label;
            const isFirst = idx === 0;
            const isLast = idx === 3;
            return (
              <Box
                key={label}
                onClick={() => setFilter(label)}
                sx={{
                  flex: 1,
                  backgroundColor: active ? '#9163ff' : '#fff',
                  color: active ? '#fff' : '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  borderRadius: active
                    ? '44.835px'
                    : `${isFirst ? '44.835px' : 0} ${isLast ? '44.835px' : 0} ${isLast ? '44.835px' : 0} ${isFirst ? '44.835px' : 0}`,
                }}
              >
                {label}
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 4,
        alignItems: 'stretch',
      }}>
        {filtered.map((p, idx) => (
          <Box key={idx} sx={{ display: 'flex' }}>
            <Card
              sx={{
                width: '100%',
                minHeight: 360,
                bgcolor: '#fff',
                border: '1.5px solid #EBEBED',
                borderRadius: '30px',
                boxShadow: '0 10px 30px rgba(124,92,250,0.10)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                p: 0,
                transition: 'transform 0.2s, box-shadow 0.2s',
                overflow: 'hidden',
                fontFamily: 'Montserrat',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 18px 38px rgba(124,92,250,0.18)',
                },
              }}
            >
              <CardMedia
                component="img"
                image={p.image}
                alt={p.title}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ width: '100%', px: 3, py: 2.5, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 999,
                    bgcolor: '#F3F0FF',
                    color: '#754FFF',
                    fontWeight: 600,
                    fontSize: 13,
                  }}>{p.type}</Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ fontWeight: 700, fontSize: 14, color: '#754FFF' }}>{p.rating.toFixed(1)}</Box>
                    <Box sx={{ fontSize: 16, color: '#FFD600' }}>★</Box>
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#232323', mt: 0.5 }}>{p.title}</Typography>
                <Typography sx={{ fontWeight: 400, fontSize: 14, color: '#A09CB0', mb: 0.5 }}>{p.author}</Typography>
                <Typography sx={{ fontWeight: 400, fontSize: 14, color: '#232323' }}>{p.description}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      {/* Сноска Другие проекты */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 4, cursor: 'pointer' }}>
        <Box component="img" src={downArrow} alt="Другие проекты" sx={{ width: 20, height: 20 }} />
        <Typography sx={{ fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 500, fontSize: 16, color: '#754FFF' }}>
          Другие проекты
        </Typography>
      </Box>
    </Box>
  );
};

export default BestPerformers;
