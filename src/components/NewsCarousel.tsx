import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AccessTime as AccessTimeIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import news1 from '../app/assets/news1.jpg';
import news2 from '../app/assets/news2.jpg';
import news3 from '../app/assets/news3.png';
import news4 from '../app/assets/news4.jpg';

// Моковые данные новостей
const mockNews = [
  {
    id: 1,
    title: '3D-печать лица: новые возможности персонализации',
    excerpt: 'Современные 3D-принтеры позволяют создавать точные копии человеческих лиц и сложные макеты для медицины, кино и образования.',
    image: news1, // Голова на 3D-принтере
    category: 'Технологии',
  },
  {
    id: 2,
    title: 'Пластик для 3D-печати: выбор материала для задач',
    excerpt: 'PLA, ABS, PETG и другие виды пластика открывают широкие возможности для создания прототипов, игрушек и функциональных деталей.',
    image: news2, // Катушки с пластиком
    category: 'Материалы',
  },
  {
    id: 3,
    title: 'Фотополимерная смола: точность и детализация',
    excerpt: 'SLA/DLP/LCD-принтеры используют фотополимерную смолу для создания сверхдетализированных и гладких моделей.',
    image: news3, // Оранжевая смола
    category: 'Фотополимеры',
  },
  {
    id: 4,
    title: '3D-прототипирование: от идеи к реальному объекту',
    excerpt: '3D-принтеры и современное ПО позволяют быстро воплощать идеи в физические объекты для бизнеса, науки и творчества.',
    image: news4, // Принтер и разноцветные модели
    category: 'Прототипирование',
  },
];

const NewsCarousel: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, mockNews.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Автоматическое переключение слайдов
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const visibleNews = mockNews.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <Box
      id="news"
      sx={{ width: '100%', bgcolor: '#fff', py: { xs: 6, md: 10 }, mb: '50px' }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        {/* Заголовок секции */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2"
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
            Свежие новости
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#1E1E1E',
              fontSize: { xs: 16, md: 24 },
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Будьте в курсе последних событий в мире 3D-печати и технологий
          </Typography>
        </Box>

        {/* Карусель */}
        <Box sx={{ position: 'relative' }}>
          {/* Кнопки навигации */}
          <IconButton
            onClick={prevSlide}
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 2,
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={nextSlide}
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: '#fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 2,
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* Контейнер для карточек */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflow: 'hidden',
              justifyContent: 'center',
            }}
          >
            {visibleNews.map((news) => (
              <Card
                key={news.id}
                sx={{
                  minWidth: { xs: '100%', md: 350 },
                  maxWidth: { xs: '100%', md: 350 },
                  height: 500,
                  borderRadius: 1,
                  boxShadow: '0 8px 32px rgba(124,92,250,0.12)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 48px rgba(124,92,250,0.2)',
                  },
                }}
              >
                {/* Изображение */}
                <Box
                  sx={{
                    height: 200,
                    backgroundImage: `url(${news.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Категория */}
                  <Chip
                    label={news.category}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      bgcolor: 'rgba(117,79,255,0.9)',
                      color: '#fff',
                      fontWeight: 600,
                    }}
                    size="small"
                  />
                </Box>

                <CardContent sx={{ p: 3, height: 300, display: 'flex', flexDirection: 'column' }}>
                  {/* Заголовок */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#232323',
                      mb: 2,
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {news.title}
                  </Typography>

                  {/* Описание */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.5,
                    }}
                  >
                    {news.excerpt}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Индикаторы */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
              gap: 1,
            }}
          >
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <Box
                key={index}
                onClick={() => goToSlide(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: index === currentIndex ? '#9163FF' : '#E0E0E0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: index === currentIndex ? '#9163FF' : '#BDBDBD',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Кнопка "Все новости" */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <a
            href="https://dzen.ru/treed"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#754FFF',
              color: '#fff',
              border: 'none',
              borderRadius: 32,
              padding: '12px 32px',
              fontSize: 16,
              fontWeight: 600,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#9163FF')}
            onMouseOut={e => (e.currentTarget.style.background = '#9163FF')}
          >
            Все новости
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsCarousel; 