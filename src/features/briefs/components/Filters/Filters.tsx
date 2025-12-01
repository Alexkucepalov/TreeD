import React, { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Slider,
  SelectChangeEvent,
} from '@mui/material';
import styles from './Filters.module.scss';

interface FiltersProps {
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  category: string;
  rating: boolean;
  printTypes: string[];
  materials: string[];
  size: string;
  priceRange: [number, number];
  deadlineRange: [string, string];
  verified: boolean;
  withReviews: boolean;
  withReferences: boolean;
}

const Filters: React.FC<FiltersProps> = ({ onApply }) => {
  const [category, setCategory] = useState<string>('');
  const [rating, setRating] = useState<boolean>(false);
  const [printTypes, setPrintTypes] = useState<string[]>(['FDM', 'SLA']);
  const [materials, setMaterials] = useState<string[]>(['FDM', 'SLA']);
  const [size, setSize] = useState<string>('10-30');
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 50000]);
  const [deadlineRange, setDeadlineRange] = useState<[string, string]>(['5 дней', '1 месяц']);
  const [verified, setVerified] = useState<boolean>(false);
  const [withReviews, setWithReviews] = useState<boolean>(true);
  const [withReferences, setWithReferences] = useState<boolean>(false);

  const handleRemovePrintType = (type: string) => {
    setPrintTypes(printTypes.filter(t => t !== type));
  };

  const handleRemoveMaterial = (material: string) => {
    setMaterials(materials.filter(m => m !== material));
  };

  const handleApply = () => {
    onApply({
      category,
      rating,
      printTypes,
      materials,
      size,
      priceRange,
      deadlineRange,
      verified,
      withReviews,
      withReferences,
    });
  };

  return (
    <Box className={styles.filtersContainer}>
      <Typography className={styles.title} variant="h6">Фильтры</Typography>
      
      <Box className={styles.filtersContent}>
        {/* Категории и рейтинг */}
        <Box className={styles.filterGroup}>
          <FormControl fullWidth size="small" className={styles.categorySelect}>
            <Select
              value={category || 'all'}
              onChange={(e: SelectChangeEvent) => setCategory(e.target.value)}
              displayEmpty
              sx={{
                borderRadius: '30px',
                height: '31px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#c4c4c4',
                },
                '& .MuiSelect-select': {
                  padding: '5px 25px',
                  color: category ? '#000' : '#c4c4c4',
                  fontFamily: '"Montserrat-Medium", sans-serif',
                  fontSize: '16px',
                },
              }}
            >
              <MenuItem value="all">Все категории</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="outlined"
            fullWidth
            className={styles.ratingButton}
            onClick={() => setRating(!rating)}
            sx={{
              borderRadius: '30px',
              height: '31px',
              borderColor: rating ? '#9163ff' : '#c4c4c4',
              color: rating ? '#9163ff' : '#c4c4c4',
              backgroundColor: rating ? 'rgba(145, 99, 255, 0.1)' : 'transparent',
              fontFamily: '"Montserrat-Medium", sans-serif',
              fontSize: '16px',
              textTransform: 'none',
              padding: '5px 25px',
              '&:hover': {
                borderColor: '#9163ff',
                color: '#9163ff',
                backgroundColor: rating ? 'rgba(145, 99, 255, 0.15)' : 'transparent',
              },
            }}
          >
            Высокий рейтинг
          </Button>
        </Box>

        {/* Тип 3D-печати */}
        <Box className={styles.filterSection}>
          <Typography className={styles.sectionTitle}>Тип 3D-печати</Typography>
          <Box className={styles.chipsContainer}>
            {printTypes.length > 0 ? (
              printTypes.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  onDelete={() => handleRemovePrintType(type)}
                  sx={{
                    backgroundColor: '#ffcfaa',
                    color: '#ff7733',
                    fontFamily: '"Montserrat-Medium", sans-serif',
                    fontSize: '12px',
                    height: '23px',
                    padding: '4px 7px',
                    borderRadius: '30px',
                    '& .MuiChip-label': {
                      padding: '0 3px',
                    },
                    '& .MuiChip-deleteIcon': {
                      width: '8px',
                      height: '8px',
                      color: '#ff7733',
                      fontSize: '12px',
                      margin: '0 0 0 3px',
                    },
                  }}
                />
              ))
            ) : (
              <Typography
                sx={{
                  color: '#c4c4c4',
                  fontFamily: '"Montserrat-Regular", sans-serif',
                  fontSize: '14px',
                  fontStyle: 'italic',
                }}
              >
                Нет выбранных типов
              </Typography>
            )}
          </Box>
        </Box>

        {/* Материалы */}
        <Box className={styles.filterSection}>
          <Typography className={styles.sectionTitle}>Материалы</Typography>
          <Box className={styles.chipsContainer}>
            {materials.length > 0 ? (
              materials.map((material) => (
                <Chip
                  key={material}
                  label={material}
                  onDelete={() => handleRemoveMaterial(material)}
                  sx={{
                    backgroundColor: '#ffc7c7',
                    color: '#e03b3b',
                    fontFamily: '"Montserrat-Medium", sans-serif',
                    fontSize: '12px',
                    height: '23px',
                    padding: '4px 7px',
                    borderRadius: '30px',
                    '& .MuiChip-label': {
                      padding: '0 3px',
                    },
                    '& .MuiChip-deleteIcon': {
                      width: '8px',
                      height: '8px',
                      color: '#e03b3b',
                      fontSize: '12px',
                      margin: '0 0 0 3px',
                    },
                  }}
                />
              ))
            ) : (
              <Typography
                sx={{
                  color: '#c4c4c4',
                  fontFamily: '"Montserrat-Regular", sans-serif',
                  fontSize: '14px',
                  fontStyle: 'italic',
                }}
              >
                Нет выбранных материалов
              </Typography>
            )}
          </Box>
        </Box>

        {/* Размеры */}
        <Box className={styles.filterSection}>
          <Typography className={styles.sectionTitle}>Размеры</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={size}
              onChange={(e) => setSize(e.target.value)}
              sx={{
                gap: '6px',
                '& .MuiFormControlLabel-root': {
                  margin: 0,
                },
                '& .MuiRadio-root': {
                  padding: '0',
                  width: '16px',
                  height: '16px',
                  marginRight: '6px',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '16px',
                },
                '& .Mui-checked': {
                  color: '#9163ff',
                },
              }}
            >
              <FormControlLabel
                value="less-10"
                control={<Radio />}
                label="Менее 10 см"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontFamily: '"Montserrat-Regular", sans-serif',
                    fontSize: '16px',
                    color: size === 'less-10' ? '#9163ff' : '#c4c4c4',
                  },
                }}
              />
              <FormControlLabel
                value="10-30"
                control={<Radio />}
                label="10 см — 30 см"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontFamily: '"Montserrat-Regular", sans-serif',
                    fontSize: '16px',
                    color: size === '10-30' ? '#9163ff' : '#c4c4c4',
                  },
                }}
              />
              <FormControlLabel
                value="more-30"
                control={<Radio />}
                label="более 30 см"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontFamily: '"Montserrat-Regular", sans-serif',
                    fontSize: '16px',
                    color: size === 'more-30' ? '#9163ff' : '#c4c4c4',
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Цена */}
        <Box className={styles.filterSection}>
          <Typography className={styles.sectionTitle}>Цена</Typography>
          <Box sx={{ width: '100%', px: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: '"Montserrat-Medium", sans-serif', 
                  fontSize: '14px', 
                  color: '#9163ff',
                  fontWeight: 500,
                }}
              >
                {priceRange[0].toLocaleString('ru-RU')} ₽
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: '"Montserrat-Medium", sans-serif', 
                  fontSize: '14px', 
                  color: '#9163ff',
                  fontWeight: 500,
                }}
              >
                {priceRange[1].toLocaleString('ru-RU')} ₽
              </Typography>
            </Box>
            <Slider
              value={priceRange}
              onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
              min={500}
              max={50000}
              valueLabelDisplay="off"
              sx={{
                color: '#9163ff',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                  backgroundColor: '#9163ff',
                  border: '2px solid #ffffff',
                  boxShadow: '0px 2px 6px rgba(145, 99, 255, 0.3)',
                  '&:hover, &:focus, &.Mui-active': {
                    boxShadow: '0px 3px 8px rgba(145, 99, 255, 0.5)',
                  },
                },
                '& .MuiSlider-track': {
                  border: 'none',
                  height: 4,
                },
                '& .MuiSlider-rail': {
                  opacity: 0.3,
                  backgroundColor: '#c4c4c4',
                  height: 4,
                },
              }}
            />
          </Box>
        </Box>

        {/* Дедлайн */}
        <Box className={styles.filterSection}>
          <Typography className={styles.sectionTitle}>Дедлайн</Typography>
          <Box sx={{ width: '100%', px: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: '"Montserrat-Medium", sans-serif', 
                  fontSize: '14px', 
                  color: '#9163ff',
                  fontWeight: 500,
                }}
              >
                5 дней
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: '"Montserrat-Medium", sans-serif', 
                  fontSize: '14px', 
                  color: '#9163ff',
                  fontWeight: 500,
                }}
              >
                1 месяц
              </Typography>
            </Box>
            <Slider
              value={[5, 30]}
              min={0}
              max={30}
              valueLabelDisplay="off"
              sx={{
                color: '#9163ff',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                  backgroundColor: '#9163ff',
                  border: '2px solid #ffffff',
                  boxShadow: '0px 2px 6px rgba(145, 99, 255, 0.3)',
                  '&:hover, &:focus, &.Mui-active': {
                    boxShadow: '0px 3px 8px rgba(145, 99, 255, 0.5)',
                  },
                },
                '& .MuiSlider-track': {
                  border: 'none',
                  height: 4,
                },
                '& .MuiSlider-rail': {
                  opacity: 0.3,
                  backgroundColor: '#c4c4c4',
                  height: 4,
                },
              }}
            />
          </Box>
        </Box>

        {/* Дополнительно */}
        <Box className={styles.filterSection}>
          <Typography className={styles.sectionTitle}>Дополнительно</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={verified}
                  onChange={(e) => setVerified(e.target.checked)}
                  sx={{
                    padding: '0',
                    width: '16px',
                    height: '16px',
                    marginRight: '6px',
                    color: '#c4c4c4',
                    '&.Mui-checked': {
                      color: '#9163ff',
                    },
                  }}
                />
              }
              label="Проверенный заказчик"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: '"Montserrat-Regular", sans-serif',
                  fontSize: '16px',
                  color: verified ? '#9163ff' : '#c4c4c4',
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={withReviews}
                  onChange={(e) => setWithReviews(e.target.checked)}
                  sx={{
                    padding: '0',
                    width: '16px',
                    height: '16px',
                    marginRight: '6px',
                    color: '#c4c4c4',
                    '&.Mui-checked': {
                      color: '#9163ff',
                    },
                  }}
                />
              }
              label="С отзывами"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: '"Montserrat-Regular", sans-serif',
                  fontSize: '16px',
                  color: withReviews ? '#9163ff' : '#c4c4c4',
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={withReferences}
                  onChange={(e) => setWithReferences(e.target.checked)}
                  sx={{
                    padding: '0',
                    width: '16px',
                    height: '16px',
                    marginRight: '6px',
                    color: '#c4c4c4',
                    '&.Mui-checked': {
                      color: '#9163ff',
                    },
                  }}
                />
              }
              label="С референсами"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: '"Montserrat-Regular", sans-serif',
                  fontSize: '16px',
                  color: withReferences ? '#9163ff' : '#c4c4c4',
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '10px', width: '100%' }}>
        <Button
          variant="outlined"
          onClick={() => {
            setCategory('');
            setRating(false);
            setPrintTypes([]);
            setMaterials([]);
            setSize('10-30');
            setPriceRange([500, 50000]);
            setDeadlineRange(['5 дней', '1 месяц']);
            setVerified(false);
            setWithReviews(true);
            setWithReferences(false);
          }}
          sx={{
            borderRadius: '30px',
            height: '40px',
            padding: '10px 20px',
            fontFamily: '"Montserrat-Medium", sans-serif',
            fontSize: '16px',
            textTransform: 'none',
            flex: 1,
            borderColor: '#c4c4c4',
            color: '#c4c4c4',
            '&:hover': {
              borderColor: '#9163ff',
              color: '#9163ff',
            },
          }}
        >
          Сбросить
        </Button>
        <Button
          variant="contained"
          onClick={handleApply}
          className={styles.applyButton}
          sx={{
            backgroundColor: '#9163ff',
            borderRadius: '30px',
            height: '40px',
            padding: '10px 35px',
            fontFamily: '"Montserrat-Medium", sans-serif',
            fontSize: '18px',
            textTransform: 'none',
            flex: 2,
            '&:hover': {
              backgroundColor: '#5B4C9D',
            },
          }}
        >
          Применить
        </Button>
      </Box>
    </Box>
  );
};

export default Filters;

