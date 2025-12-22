import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Alert,
} from '@mui/material';
import { ProfileHeader } from '@features/profile';
import styles from './CreateOrder.module.scss';

type OrderType = 'mechanism' | 'prototype' | 'souvenir' | 'layout' | 'other';
type MaterialMode = 'simple' | 'advanced';
type Environment = 'indoor' | 'outdoor' | 'any';
type SurfaceType = 'matte' | 'glossy' | 'wood' | 'any';
type Temperature = '<0' | '<40' | '<80' | '<100' | '>100';
type MaterialType = 'PLA' | 'ABS' | 'PETG' | 'TPU' | 'PA' | 'ASA' | 'PP' | 'other';
type ColorPalette = 'basic' | 'custom';
type Strength = 'low' | 'medium' | 'high';

interface OrderFormData {
  orderType: OrderType | '';
  description: string;
  materialMode: MaterialMode;
  // Простой режим
  environment: Environment;
  surfaceType: SurfaceType;
  temperature: Temperature;
  chemicalResistant: boolean;
  needsFlexibility: boolean;
  flexibilityLevel: 'low' | 'medium' | 'high' | '';
  // Продвинутый режим
  materialType: MaterialType | '';
  stiffness: string;
  composite: string;
  compositePercentage: string;
  // Цвет
  colorPalette: ColorPalette;
  selectedColors: string[]; // Массив выбранных цветов (HEX), максимум 3
  customColor: string; // Кастомный цвет в HEX
  transparent: boolean;
  twoColor: boolean;
  threeColor: boolean;
  // Модель
  hasModel: boolean | null;
  modelFile: File | null;
  dimensions: {
    width: string;
    height: string;
    length: string;
  };
  photoFiles: File[];
  // Сроки
  deadline: string;
  noDeadline: boolean;
  // Доп услуги
  needsNDA: boolean;
  needsExtraReceipt: boolean;
  // Количество
  quantity: string;
  // Дополнительные модели
  needsMoreModels: boolean | null;
  isAssembly: boolean | null;
  singleExecutor: boolean | null;
}

const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<OrderFormData>({
    orderType: '',
    description: '',
    materialMode: 'simple',
    environment: 'indoor',
    surfaceType: 'any',
    temperature: '<80',
    chemicalResistant: false,
    needsFlexibility: false,
    flexibilityLevel: '',
    materialType: '',
    stiffness: '',
    composite: '',
    compositePercentage: '',
    colorPalette: 'basic',
    selectedColors: [],
    customColor: '',
    transparent: false,
    twoColor: false,
    threeColor: false,
    hasModel: null,
    modelFile: null,
    dimensions: { width: '', height: '', length: '' },
    photoFiles: [],
    deadline: '',
    noDeadline: false,
    needsNDA: false,
    needsExtraReceipt: false,
    quantity: '1',
    needsMoreModels: null,
    isAssembly: null,
    singleExecutor: null,
  });

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const steps = [
    'Тип заказа',
    'Описание',
    'Материал',
    'Цвет',
    '3D-модель',
    'Сроки и услуги',
    'Количество',
    'Подтверждение',
  ];

  const autofillStyles = {
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset !important',
      WebkitTextFillColor: '#333 !important',
      backgroundColor: 'transparent !important',
    },
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
      setError(null);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError(null);
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0:
        if (!formData.orderType) {
          setError('Выберите тип заказа');
          return false;
        }
        return true;
      case 1:
        if (!formData.description || formData.description.length < 10) {
          setError('Опишите деталь (минимум 10 символов)');
          return false;
        }
        return true;
      case 2:
        if (formData.materialMode === 'advanced' && !formData.materialType) {
          setError('Выберите тип материала');
          return false;
        }
        return true;
      case 3:
        return true;
      case 4:
        if (formData.hasModel === null) {
          setError('Укажите, есть ли у вас 3D-модель');
          return false;
        }
        if (formData.hasModel && !formData.modelFile) {
          setError('Прикрепите файл модели');
          return false;
        }
        if (!formData.hasModel) {
          if (!formData.dimensions.width || !formData.dimensions.height || !formData.dimensions.length) {
            setError('Укажите габариты детали');
            return false;
          }
        }
        return true;
      case 5:
        if (!formData.noDeadline && !formData.deadline) {
          setError('Укажите сроки или выберите "Нет срока"');
          return false;
        }
        return true;
      case 6:
        if (!formData.quantity || parseInt(formData.quantity) < 1) {
          setError('Укажите количество (минимум 1)');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;

    setSubmitting(true);
    setError(null);

    try {
      // TODO: Отправка данных на сервер
      console.log('Order data:', formData);
      
      // Имитация отправки
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      alert('Заказ успешно создан!');
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Ошибка при создании заказа');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        const orderTypes = [
          {
            value: 'mechanism' as OrderType,
            title: 'Деталь для механизма',
            description: 'Шестерня, крепление, переходник и т.п.',
          },
          {
            value: 'prototype' as OrderType,
            title: 'Прототип',
            description: 'Корпус, тестовый элемент, макет функциональной детали',
          },
          {
            value: 'souvenir' as OrderType,
            title: 'Сувенир / декор',
            description: 'Игрушка, ваза, фигурка, статуэтка',
          },
          {
            value: 'layout' as OrderType,
            title: 'Макет',
            description: 'Архитектура, ландшафт, инженерные объекты',
          },
          {
            value: 'other' as OrderType,
            title: 'Другое',
            description: 'Укажите тип заказа',
          },
        ];

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                textAlign: 'center', 
                color: '#232323',
                fontWeight: 500,
                fontSize: '18px',
              }}
            >
              Что нужно напечатать?
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                gap: 2.5,
              }}
            >
              {orderTypes.map((type) => (
                <Box
                  key={type.value}
                  onClick={() => setFormData({ ...formData, orderType: type.value })}
                  sx={{
                    p: 3.5,
                    borderRadius: 2,
                    border: formData.orderType === type.value 
                      ? '2px solid #9163FF' 
                      : '1.5px solid #e0e0e0',
                    bgcolor: formData.orderType === type.value 
                      ? 'rgba(145, 99, 255, 0.08)' 
                      : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    position: 'relative',
                    minHeight: '120px',
                    '&:hover': {
                      borderColor: formData.orderType === type.value ? '#9163FF' : '#9163FF',
                      bgcolor: formData.orderType === type.value 
                        ? 'rgba(145, 99, 255, 0.12)' 
                        : 'rgba(145, 99, 255, 0.04)',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(145, 99, 255, 0.2)',
                    },
                  }}
                >
                  {formData.orderType === type.value && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: '#9163FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(145, 99, 255, 0.3)',
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#fff',
                          fontSize: '16px',
                          fontWeight: 600,
                          lineHeight: 1,
                        }}
                      >
                        ✓
                      </Typography>
                    </Box>
                  )}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: formData.orderType === type.value ? '#9163FF' : '#232323',
                      mb: 1,
                      pr: formData.orderType === type.value ? 4 : 0,
                      transition: 'color 0.2s',
                    }}
                  >
                    {type.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    {type.description}
                  </Typography>
                </Box>
              ))}
            </Box>
            {formData.orderType === 'other' && (
              <TextField
                label="Укажите тип заказа"
                fullWidth
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                sx={{ mt: 1, ...autofillStyles }}
              />
            )}
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Напишите всю полезную информацию, которая поможет исполнителю выполнить ваш заказ качественно
            </Typography>
            <TextField
              label="Опишите деталь, требования и особенности эксплуатации"
              placeholder="Например: «Шестерня для редуктора Ø40 мм, шаг 2 мм, максимально прочная и износостойкая» или «Корпус для датчика с крышкой на защелке. Нагрузки не испытывает»"
              multiline
              rows={6}
              fullWidth
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              inputProps={{ maxLength: 200 }}
              helperText={`${formData.description.length}/200 символов`}
              sx={autofillStyles}
            />
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Выберите материал
            </Typography>
            
            <FormControl>
              <FormLabel>Режим выбора</FormLabel>
              <RadioGroup
                row
                value={formData.materialMode}
                onChange={(e) => setFormData({ ...formData, materialMode: e.target.value as MaterialMode })}
              >
                <FormControlLabel value="simple" control={<Radio />} label="Простой" />
                <FormControlLabel value="advanced" control={<Radio />} label="Продвинутый" />
              </RadioGroup>
            </FormControl>

            {formData.materialMode === 'simple' ? (
              <>
                <FormControl fullWidth>
                  <InputLabel>Место использования</InputLabel>
                  <Select
                    value={formData.environment}
                    onChange={(e) => setFormData({ ...formData, environment: e.target.value as Environment })}
                  >
                    <MenuItem value="indoor">В закрытой среде</MenuItem>
                    <MenuItem value="outdoor">На улице</MenuItem>
                    <MenuItem value="any">Неважно</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Тип поверхности</InputLabel>
                  <Select
                    value={formData.surfaceType}
                    onChange={(e) => setFormData({ ...formData, surfaceType: e.target.value as SurfaceType })}
                  >
                    <MenuItem value="matte">Матовая</MenuItem>
                    <MenuItem value="glossy">Глянцевая</MenuItem>
                    <MenuItem value="wood">Древесный</MenuItem>
                    <MenuItem value="any">Неважно</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Температура эксплуатации</InputLabel>
                  <Select
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: e.target.value as Temperature })}
                  >
                    <MenuItem value="<0">&lt;0°C</MenuItem>
                    <MenuItem value="<40">&lt;40°C</MenuItem>
                    <MenuItem value="<80">&lt;80°C</MenuItem>
                    <MenuItem value="<100">&lt;100°C</MenuItem>
                    <MenuItem value=">100">&gt;100°C</MenuItem>
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.chemicalResistant}
                      onChange={(e) => setFormData({ ...formData, chemicalResistant: e.target.checked })}
                    />
                  }
                  label="Хим / Маслостойкость"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.needsFlexibility}
                      onChange={(e) => setFormData({ ...formData, needsFlexibility: e.target.checked })}
                    />
                  }
                  label="Нужна гибкость"
                />

                {formData.needsFlexibility && (
                  <FormControl fullWidth>
                    <InputLabel>Уровень гибкости</InputLabel>
                    <Select
                      value={formData.flexibilityLevel}
                      onChange={(e) => setFormData({ ...formData, flexibilityLevel: e.target.value as any })}
                    >
                      <MenuItem value="low">Низкая</MenuItem>
                      <MenuItem value="medium">Средняя</MenuItem>
                      <MenuItem value="high">Высокая</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </>
            ) : (
              <>
                <FormControl fullWidth>
                  <InputLabel>Тип материала</InputLabel>
                  <Select
                    value={formData.materialType}
                    onChange={(e) => setFormData({ ...formData, materialType: e.target.value as MaterialType })}
                  >
                    <MenuItem value="PLA">PLA</MenuItem>
                    <MenuItem value="ABS">ABS</MenuItem>
                    <MenuItem value="PETG">PETG</MenuItem>
                    <MenuItem value="TPU">TPU</MenuItem>
                    <MenuItem value="PA">PA</MenuItem>
                    <MenuItem value="ASA">ASA</MenuItem>
                    <MenuItem value="PP">PP</MenuItem>
                    <MenuItem value="other">Другое</MenuItem>
                  </Select>
                </FormControl>

                {formData.materialType && (
                  <>
                    <FormControl fullWidth>
                      <InputLabel>Жесткость</InputLabel>
                      <Select
                        value={formData.stiffness}
                        onChange={(e) => setFormData({ ...formData, stiffness: e.target.value })}
                      >
                        <MenuItem value="A">A (75)</MenuItem>
                        <MenuItem value="D">D (60)</MenuItem>
                        <MenuItem value="90">90</MenuItem>
                        <MenuItem value="70">70</MenuItem>
                        <MenuItem value="95">95</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      label="Композит и процентное содержание"
                      placeholder="Например: GF 20%"
                      fullWidth
                      value={formData.composite}
                      onChange={(e) => setFormData({ ...formData, composite: e.target.value })}
                      helperText="Исполнитель подберет ближайший к указанному значению"
                      sx={autofillStyles}
                    />
                  </>
                )}
              </>
            )}
          </Box>
        );

      case 3:
        // 16 базовых цветов для 3D-печати
        const basicColors = [
          { name: 'Белый', hex: '#FFFFFF' },
          { name: 'Черный', hex: '#000000' },
          { name: 'Серый', hex: '#808080' },
          { name: 'Красный', hex: '#FF0000' },
          { name: 'Оранжевый', hex: '#FFA500' },
          { name: 'Желтый', hex: '#FFFF00' },
          { name: 'Зеленый', hex: '#00FF00' },
          { name: 'Голубой', hex: '#00FFFF' },
          { name: 'Синий', hex: '#0000FF' },
          { name: 'Фиолетовый', hex: '#8000FF' },
          { name: 'Розовый', hex: '#FF00FF' },
          { name: 'Коричневый', hex: '#8B4513' },
          { name: 'Бежевый', hex: '#F5F5DC' },
          { name: 'Серебристый', hex: '#C0C0C0' },
          { name: 'Золотой', hex: '#FFD700' },
          { name: 'Лайм', hex: '#32CD32' },
        ];

        const handleColorClick = (colorHex: string) => {
          const currentColors = formData.selectedColors;
          const colorIndex = currentColors.indexOf(colorHex);

          if (colorIndex > -1) {
            // Удаляем цвет если он уже выбран
            const newColors = currentColors.filter(c => c !== colorHex);
            const newTwoColor = newColors.length === 2;
            const newThreeColor = newColors.length === 3;
            setFormData({
              ...formData,
              selectedColors: newColors,
              twoColor: newTwoColor,
              threeColor: newThreeColor,
            });
          } else {
            // Добавляем цвет если не достигнут лимит
            if (currentColors.length < 3) {
              const newColors = [...currentColors, colorHex];
              const newTwoColor = newColors.length === 2;
              const newThreeColor = newColors.length === 3;
              setFormData({
                ...formData,
                selectedColors: newColors,
                twoColor: newTwoColor,
                threeColor: newThreeColor,
              });
            }
          }
        };

        const handleTwoColorChange = (checked: boolean) => {
          if (checked) {
            // Если выбрали двухцветный
            setFormData({ ...formData, twoColor: true, threeColor: false });
          } else {
            // Если сняли галочку двухцветный
            setFormData({ ...formData, twoColor: false });
            if (formData.selectedColors.length === 2) {
              // Если было 2 цвета, оставляем только первый
              setFormData({
                ...formData,
                twoColor: false,
                selectedColors: formData.selectedColors.slice(0, 1),
              });
            }
          }
        };

        const handleThreeColorChange = (checked: boolean) => {
          if (checked) {
            // Если выбрали трехцветный
            setFormData({ ...formData, threeColor: true, twoColor: false });
          } else {
            // Если сняли галочку трехцветный
            setFormData({ ...formData, threeColor: false });
            if (formData.selectedColors.length === 3) {
              // Если было 3 цвета, оставляем только первые 2
              setFormData({
                ...formData,
                threeColor: false,
                selectedColors: formData.selectedColors.slice(0, 2),
                twoColor: true,
              });
            }
          }
        };

        const handleCustomColorAdd = () => {
          if (formData.customColor && formData.selectedColors.length < 3) {
            const colorHex = formData.customColor.toUpperCase();
            if (!formData.selectedColors.includes(colorHex)) {
              const newColors = [...formData.selectedColors, colorHex];
              const newTwoColor = newColors.length === 2;
              const newThreeColor = newColors.length === 3;
              setFormData({
                ...formData,
                selectedColors: newColors,
                twoColor: newTwoColor,
                threeColor: newThreeColor,
                customColor: '', // Очищаем поле после добавления
              });
            }
          }
        };

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Выберите цвет
            </Typography>

            <FormControl>
              <FormLabel>Цветовая палитра</FormLabel>
              <RadioGroup
                value={formData.colorPalette}
                onChange={(e) => {
                  setFormData({ 
                    ...formData, 
                    colorPalette: e.target.value as ColorPalette,
                  });
                }}
              >
                <FormControlLabel value="basic" control={<Radio />} label="Базовые 16 цветов" />
                <FormControlLabel value="custom" control={<Radio />} label="Другое (укажите)" />
              </RadioGroup>
            </FormControl>

            {formData.colorPalette === 'basic' && (
              <Box>
                <Typography variant="body2" sx={{ mb: 1.5, color: '#666', fontSize: '13px' }}>
                  Выберите цвет из палитры (максимум 3 цвета):
                </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(8, 1fr)',
                  gap: 1,
                  '@media (max-width: 900px)': {
                    gridTemplateColumns: 'repeat(6, 1fr)',
                  },
                  '@media (max-width: 600px)': {
                    gridTemplateColumns: 'repeat(4, 1fr)',
                  },
                }}
              >
                {basicColors.map((color) => {
                  const isSelected = formData.selectedColors.includes(color.hex);
                  const canSelect = formData.selectedColors.length < 3 || isSelected;
                  return (
                    <Box
                      key={color.hex}
                      onClick={() => canSelect && handleColorClick(color.hex)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: canSelect ? 'pointer' : 'not-allowed',
                        p: 0.75,
                        borderRadius: 1,
                        border: isSelected ? '2px solid #9163FF' : '1px solid transparent',
                        bgcolor: isSelected ? 'rgba(145, 99, 255, 0.1)' : 'transparent',
                        opacity: canSelect ? 1 : 0.5,
                        transition: 'all 0.2s',
                        '&:hover': canSelect ? {
                          bgcolor: isSelected ? 'rgba(145, 99, 255, 0.15)' : 'rgba(145, 99, 255, 0.05)',
                          transform: 'scale(1.08)',
                          borderColor: '#9163FF',
                        } : {},
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1,
                          bgcolor: color.hex,
                          border: '1px solid #ddd',
                          mb: 0.5,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          position: 'relative',
                        }}
                      >
                        {isSelected && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: -4,
                              right: -4,
                              width: 18,
                              height: 18,
                              borderRadius: '50%',
                              bgcolor: '#9163FF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '2px solid #fff',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            }}
                          >
                            <Typography sx={{ color: '#fff', fontSize: '10px', fontWeight: 600 }}>
                              {formData.selectedColors.indexOf(color.hex) + 1}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      <Typography variant="caption" sx={{ fontSize: '10px', textAlign: 'center', lineHeight: 1.2 }}>
                        {color.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
              {formData.selectedColors.length > 0 && (
                <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: '13px' }}>
                    Выбранные цвета:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                    {formData.selectedColors.map((colorHex, index) => {
                      const colorInfo = basicColors.find(c => c.hex === colorHex);
                      return (
                        <Box key={colorHex} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 1,
                              bgcolor: colorHex,
                              border: '1px solid #ddd',
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '13px' }}>
                            {index + 1}. {colorInfo?.name} ({colorHex})
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              )}
            </Box>
            )}

            {formData.colorPalette === 'custom' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, color: '#666', fontSize: '13px' }}>
                  Введите цвет в формате HEX (максимум 3 цвета):
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <TextField
                    label="HEX код цвета"
                    placeholder="#FF0000"
                    value={formData.customColor}
                    onChange={(e) => {
                      let value = e.target.value;
                      // Автоматически добавляем # если его нет
                      if (value && !value.startsWith('#')) {
                        value = '#' + value;
                      }
                      // Ограничиваем длину до 7 символов (#RRGGBB)
                      if (value.length > 7) {
                        value = value.substring(0, 7);
                      }
                      setFormData({ ...formData, customColor: value });
                    }}
                    inputProps={{ 
                      maxLength: 7,
                      pattern: '^#[0-9A-Fa-f]{6}$',
                    }}
                    helperText="Введите цвет в формате HEX (например: #FF0000)"
                    sx={{ flex: 1, ...autofillStyles }}
                  />
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 1,
                      bgcolor: formData.customColor || '#FFFFFF',
                      border: '1px solid #ddd',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      flexShrink: 0,
                      mt: 0.5,
                    }}
                  />
                </Box>
                <input
                  type="color"
                  value={formData.customColor || '#FFFFFF'}
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      customColor: e.target.value.toUpperCase(),
                    });
                  }}
                  style={{
                    width: '100%',
                    height: '50px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={handleCustomColorAdd}
                  disabled={!formData.customColor || formData.selectedColors.length >= 3 || formData.selectedColors.includes(formData.customColor.toUpperCase())}
                  sx={{
                    textTransform: 'none',
                    borderColor: '#9163FF',
                    color: '#9163FF',
                    '&:hover': {
                      borderColor: '#5B4C9D',
                      bgcolor: 'rgba(145, 99, 255, 0.05)',
                    },
                    '&:disabled': {
                      borderColor: '#ccc',
                      color: '#999',
                    },
                  }}
                >
                  Добавить цвет
                </Button>
                {formData.selectedColors.length > 0 && (
                  <Box sx={{ mt: 1, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontSize: '13px' }}>
                      Выбранные цвета:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                      {formData.selectedColors.map((colorHex, index) => (
                        <Box key={colorHex} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 1,
                              bgcolor: colorHex,
                              border: '1px solid #ddd',
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '13px' }}>
                            {index + 1}. {colorHex}
                          </Typography>
                          <Button
                            size="small"
                            onClick={() => {
                              const newColors = formData.selectedColors.filter(c => c !== colorHex);
                              const newTwoColor = newColors.length === 2;
                              const newThreeColor = newColors.length === 3;
                              setFormData({
                                ...formData,
                                selectedColors: newColors,
                                twoColor: newTwoColor,
                                threeColor: newThreeColor,
                              });
                            }}
                            sx={{
                              minWidth: 'auto',
                              p: 0.5,
                              color: '#d32f2f',
                              '&:hover': {
                                bgcolor: 'rgba(211, 47, 47, 0.1)',
                              },
                            }}
                          >
                            ✕
                          </Button>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.transparent}
                  onChange={(e) => setFormData({ ...formData, transparent: e.target.checked })}
                />
              }
              label="Прозрачный"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.twoColor}
                  onChange={(e) => handleTwoColorChange(e.target.checked)}
                />
              }
              label="Двухцветный"
            />
            {formData.twoColor && formData.selectedColors.length < 2 && (
              <Alert severity="info" sx={{ mt: -2, mb: 1 }}>
                Выберите второй цвет из палитры
              </Alert>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.threeColor}
                  onChange={(e) => handleThreeColorChange(e.target.checked)}
                />
              }
              label="Трехцветный"
            />
            {formData.threeColor && formData.selectedColors.length < 3 && (
              <Alert severity="info" sx={{ mt: -2 }}>
                Выберите третий цвет из палитры
              </Alert>
            )}
          </Box>
        );

      case 4:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Есть готовая 3D-модель?
            </Typography>

            <FormControl>
              <RadioGroup
                value={formData.hasModel === null ? '' : formData.hasModel ? 'yes' : 'no'}
                onChange={(e) => setFormData({ ...formData, hasModel: e.target.value === 'yes' })}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Да" />
                <FormControlLabel value="no" control={<Radio />} label="Нет" />
              </RadioGroup>
            </FormControl>

            {formData.hasModel === true && (
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Прикрепить модель в формате STL, 3MF
                </Typography>
                <Button variant="outlined" component="label">
                  Выбрать файл
                  <input
                    type="file"
                    hidden
                    accept=".stl,.3mf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFormData({ ...formData, modelFile: file });
                    }}
                  />
                </Button>
                {formData.modelFile && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Выбран: {formData.modelFile.name}
                  </Typography>
                )}
              </Box>
            )}

            {formData.hasModel === false && (
              <>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Введите габариты требуемой детали
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="Ширина (мм)"
                    type="number"
                    value={formData.dimensions.width}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: { ...formData.dimensions, width: e.target.value },
                      })
                    }
                    sx={autofillStyles}
                  />
                  <TextField
                    label="Высота (мм)"
                    type="number"
                    value={formData.dimensions.height}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: { ...formData.dimensions, height: e.target.value },
                      })
                    }
                    sx={autofillStyles}
                  />
                  <TextField
                    label="Длина (мм)"
                    type="number"
                    value={formData.dimensions.length}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: { ...formData.dimensions, length: e.target.value },
                      })
                    }
                    sx={autofillStyles}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Прикрепить фото по инструкции (JPG, PNG...)
                  </Typography>
                  <Button variant="outlined" component="label">
                    Выбрать файлы
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setFormData({ ...formData, photoFiles: files });
                      }}
                    />
                  </Button>
                  {formData.photoFiles.length > 0 && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Выбрано файлов: {formData.photoFiles.length}
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
        );

      case 5:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Укажите желаемые сроки (с момента взятия в работу)
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.noDeadline}
                  onChange={(e) => setFormData({ ...formData, noDeadline: e.target.checked, deadline: '' })}
                />
              }
              label="Нет срока"
            />

            {!formData.noDeadline && (
              <TextField
                label="Количество рабочих дней"
                type="number"
                placeholder="Например: 7"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                helperText="Кратно 1 дню"
                sx={autofillStyles}
              />
            )}

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Укажите нужны ли доп. услуги
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.needsNDA}
                  onChange={(e) => setFormData({ ...formData, needsNDA: e.target.checked })}
                />
              }
              label="NDA"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.needsExtraReceipt}
                  onChange={(e) => setFormData({ ...formData, needsExtraReceipt: e.target.checked })}
                />
              }
              label="Доп чек от исполнителя (вдобавок от чека от сайта)"
            />
          </Box>
        );

      case 6:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Ввод количества штук ЭТОЙ детали
            </Typography>
            <TextField
              label="Количество"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              inputProps={{ min: 1 }}
              fullWidth
              sx={autofillStyles}
            />

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Нужна ли еще какая-то модель для печати? (Проект, сборка)
            </Typography>

            <FormControl>
              <RadioGroup
                value={formData.needsMoreModels === null ? '' : formData.needsMoreModels ? 'yes' : 'no'}
                onChange={(e) => setFormData({ ...formData, needsMoreModels: e.target.value === 'yes' })}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Да" />
                <FormControlLabel value="no" control={<Radio />} label="Нет" />
              </RadioGroup>
            </FormControl>

            {formData.needsMoreModels === true && (
              <>
                <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                  Сборка?
                </Typography>
                <FormControl>
                  <RadioGroup
                    value={formData.isAssembly === null ? '' : formData.isAssembly ? 'yes' : 'no'}
                    onChange={(e) => setFormData({ ...formData, isAssembly: e.target.value === 'yes' })}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="Да" />
                    <FormControlLabel value="no" control={<Radio />} label="Нет" />
                  </RadioGroup>
                </FormControl>

                {formData.isAssembly !== null && (
                  <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
                    Хотите, чтобы весь заказ целиком выполнил один исполнитель?
                  </Typography>
                )}
                {formData.isAssembly !== null && (
                  <FormControl>
                    <RadioGroup
                      value={formData.singleExecutor === null ? '' : formData.singleExecutor ? 'yes' : 'no'}
                      onChange={(e) => setFormData({ ...formData, singleExecutor: e.target.value === 'yes' })}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Да" />
                      <FormControlLabel value="no" control={<Radio />} label="Нет" />
                    </RadioGroup>
                  </FormControl>
                )}
              </>
            )}
          </Box>
        );

      case 7:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Итоговый вид заказа для подтверждения
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Тип:</strong> {getOrderTypeLabel(formData.orderType)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Описание:</strong> {formData.description}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Режим материала:</strong> {formData.materialMode === 'simple' ? 'Простой' : 'Продвинутый'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Количество:</strong> {formData.quantity}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Срок:</strong> {formData.noDeadline ? 'Нет срока' : `${formData.deadline} дней`}
              </Typography>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  const getOrderTypeLabel = (type: OrderType | ''): string => {
    const labels: Record<OrderType, string> = {
      mechanism: 'Деталь для механизма',
      prototype: 'Прототип',
      souvenir: 'Сувенир / декор',
      layout: 'Макет',
      other: 'Другое',
    };
    return labels[type as OrderType] || '';
  };

  return (
    <div className={styles.createOrderPage}>
      <ProfileHeader />
      <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, sm: 3, md: 4 }, pt: { xs: 6, sm: 8, md: 10 } }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 400 }}>
          Шаг {activeStep + 1}: {steps[activeStep]}
        </Typography>

        <Box sx={{ mb: 4 }}>
          {/* Прогресс-бар с этапами */}
          <Box sx={{ 
            width: '100%', 
            height: 8, 
            bgcolor: '#e0e0e0', 
            borderRadius: 4,
            mb: 3,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
          }}>
            {steps.map((_, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  height: '100%',
                  bgcolor: index <= activeStep ? '#9163FF' : '#e0e0e0',
                  transition: 'background-color 0.3s ease',
                  '&:not(:last-child)': {
                    borderRight: '2px solid #fff',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Paper 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            mb: 3,
            borderRadius: 2,
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            minHeight: '400px',
          }}
        >
          {renderStepContent()}
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{
              textTransform: 'none',
              color: '#9163FF',
              '&:disabled': { color: '#ccc' },
            }}
          >
            Назад
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                textTransform: 'none',
                background: '#9163FF',
                '&:hover': { background: '#5B4C9D' },
              }}
            >
              Далее
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting}
              sx={{
                textTransform: 'none',
                background: '#9163FF',
                '&:hover': { background: '#5B4C9D' },
                '&:disabled': { background: '#ccc' },
              }}
            >
              {submitting ? 'Публикация...' : 'Опубликовать'}
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default CreateOrder;

