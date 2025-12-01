import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Stepper, 
  Step, 
  StepLabel, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Checkbox, 
  Alert, 
  Box, 
  Typography,
  IconButton,
  InputAdornment,
  Chip,
  Autocomplete
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from '@pages/login.module.scss';
import logoImg from '@assets/logo.png';
import { 
  validateContractor, 
  validateEquipment, 
  registerShopAccount, 
  fetchCads,
  fetchEquipmentTypes,
  fetchMaterials,
  fetchPrintingAreas,
  fetchModelingExperience,
  fetchPrintingExperience,
  fetchCities,
  fetchModelingDirections
} from '@shared/utils/api';
import type { ShopRegisterPayload } from '@shared/types';

const ContractorRegister = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Личная информация
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCityId, setSelectedCityId] = useState<number | ''>('');
  const [agree, setAgree] = useState(false);

  // Навыки
  const [masterRole, setMasterRole] = useState<'print' | 'modeling' | 'universal'>('print');
  const [selectedTechnologies, setSelectedTechnologies] = useState<number[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<number[]>([]);
  const [selectedPrintingArea, setSelectedPrintingArea] = useState<number | null>(null);
  const [selectedModelingDirections, setSelectedModelingDirections] = useState<number[]>([]);
  const [selectedCadIds, setSelectedCadIds] = useState<number[]>([]);
  const [printingExperience, setPrintingExperience] = useState<'under_1_year' | 'from_1_to_3_years' | 'over_3_years'>('under_1_year');
  const [modelingExperience, setModelingExperience] = useState<'under_1_year' | 'from_1_to_3_years' | 'over_3_years'>('under_1_year');
  const [workWithDrawings, setWorkWithDrawings] = useState(false);

  // Динамические данные
  const [cads, setCads] = useState<Array<{id: number, name: string}>>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<Array<{id: number, type: string}>>([]);
  const [materials, setMaterials] = useState<Array<{id: number, name: string}>>([]);
  const [printingAreas, setPrintingAreas] = useState<Array<{id: number, area: string}>>([]);
  const [modelingExperienceOptions, setModelingExperienceOptions] = useState<Array<{value: string, label: string}>>([]);
  const [printingExperienceOptions, setPrintingExperienceOptions] = useState<Array<{value: string, label: string}>>([]);
  const [cities, setCities] = useState<Array<{id: number, name: string}>>([]);
  const [modelingDirections, setModelingDirections] = useState<Array<{id: number, name: string}>>([]);

  const steps = ['Личная информация', 'Навыки', 'Подтверждение'];

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Стили для исправления автозаполнения
  const autofillStyles = {
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset !important',
      WebkitTextFillColor: '#333 !important',
      backgroundColor: 'transparent !important',
      backgroundImage: 'none !important',
      backgroundClip: 'content-box !important',
      WebkitBackgroundClip: 'content-box !important',
      color: '#333 !important',
    },
    '& input:-webkit-autofill:hover': {
      WebkitBoxShadow: '0 0 0 1000px white inset !important',
      WebkitTextFillColor: '#333 !important',
      backgroundColor: 'transparent !important',
      backgroundImage: 'none !important',
      backgroundClip: 'content-box !important',
      WebkitBackgroundClip: 'content-box !important',
      color: '#333 !important',
    },
    '& input:-webkit-autofill:focus': {
      WebkitBoxShadow: '0 0 0 1000px white inset !important',
      WebkitTextFillColor: '#333 !important',
      backgroundColor: 'transparent !important',
      backgroundImage: 'none !important',
      backgroundClip: 'content-box !important',
      WebkitBackgroundClip: 'content-box !important',
      color: '#333 !important',
    },
    '& input:-webkit-autofill:active': {
      WebkitBoxShadow: '0 0 0 1000px white inset !important',
      WebkitTextFillColor: '#333 !important',
      backgroundColor: 'transparent !important',
      backgroundImage: 'none !important',
      backgroundClip: 'content-box !important',
      WebkitBackgroundClip: 'content-box !important',
      color: '#333 !important',
    },
  };

  // Функция проверки готовности к следующему шагу
  const isStepReady = (step: number): boolean => {
    switch (step) {
      case 0: // Личная информация
        return nickname.trim() !== '' && 
               email.trim() !== '' && 
               password.trim() !== '' && 
               confirmPassword.trim() !== '' && 
               password === confirmPassword && 
               agree;
      
      case 1: // Навыки
        if (masterRole === 'print') {
          return selectedTechnologies.length > 0 && 
                 (selectedTechnologies.some(id => equipmentTypes.find(t => t.id === id)?.type === 'FDM') ? selectedMaterials.length > 0 : true) && 
                 selectedPrintingArea !== null;
        } else if (masterRole === 'modeling') {
          return selectedModelingDirections.length > 0 &&
                 selectedCadIds.length > 0;
        } else if (masterRole === 'universal') {
          return selectedTechnologies.length > 0 && 
                 (selectedTechnologies.some(id => equipmentTypes.find(t => t.id === id)?.type === 'FDM') ? selectedMaterials.length > 0 : true) && 
                 selectedPrintingArea !== null &&
                 selectedModelingDirections.length > 0 &&
                 selectedCadIds.length > 0;
        }
        return false;
      
      default:
        return false;
    }
  };

  // Загрузка динамических данных
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          cadsData,
          equipmentTypesData,
          materialsData,
          printingAreasData,
          modelingExperienceData,
          printingExperienceData,
          citiesData,
          modelingDirectionsData
        ] = await Promise.all([
          fetchCads(),
          fetchEquipmentTypes(),
          fetchMaterials(),
          fetchPrintingAreas(),
          fetchModelingExperience(),
          fetchPrintingExperience(),
          fetchCities(),
          fetchModelingDirections()
        ]);

        setCads(cadsData);
        setEquipmentTypes(equipmentTypesData);
        setMaterials(materialsData);
        setPrintingAreas(printingAreasData);
        setModelingExperienceOptions(modelingExperienceData);
        setPrintingExperienceOptions(printingExperienceData);
        setCities(citiesData);
        setModelingDirections(modelingDirectionsData);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback data
        setCads([{id: 1, name: 'Fusion 360'}, {id: 2, name: 'SolidWorks'}, {id: 3, name: 'AutoCAD'}]);
        setEquipmentTypes([{id: 1, type: 'FDM'}, {id: 2, type: 'SLA'}, {id: 3, type: 'SLS'}]);
        setMaterials([{id: 1, name: 'PLA'}, {id: 2, name: 'ABS'}, {id: 3, name: 'PETG'}]);
        setPrintingAreas([{id: 1, area: '100x100x100 mm'}, {id: 2, area: '200x200x200 mm'}, {id: 3, area: '300x300x300 mm'}]);
        setModelingExperienceOptions([
          {value: 'under_1_year', label: 'Менее 1 года'},
          {value: 'from_1_to_3_years', label: 'От 1 до 3 лет'},
          {value: 'over_3_years', label: 'Более 3 лет'}
        ]);
        setPrintingExperienceOptions([
          {value: 'under_1_year', label: 'Менее 1 года'},
          {value: 'from_1_to_3_years', label: 'От 1 до 3 лет'},
          {value: 'over_3_years', label: 'Более 3 лет'}
        ]);
        setCities([
          {id: 1, name: 'Москва'}, 
          {id: 2, name: 'Санкт-Петербург'}, 
          {id: 3, name: 'Новосибирск'},
          {id: 4, name: 'Екатеринбург'},
          {id: 5, name: 'Казань'},
          {id: 6, name: 'Нижний Новгород'},
          {id: 7, name: 'Челябинск'},
          {id: 8, name: 'Самара'},
          {id: 9, name: 'Омск'},
          {id: 10, name: 'Ростов-на-Дону'},
          {id: 11, name: 'Уфа'},
          {id: 12, name: 'Красноярск'},
          {id: 13, name: 'Воронеж'},
          {id: 14, name: 'Пермь'},
          {id: 15, name: 'Волгоград'},
          {id: 16, name: 'Краснодар'},
          {id: 17, name: 'Саратов'},
          {id: 18, name: 'Тюмень'},
          {id: 19, name: 'Тольятти'},
          {id: 20, name: 'Ижевск'}
        ]);
        setModelingDirections([{id: 1, name: 'Художественное'}, {id: 2, name: 'Техническое'}]);
      }
    };

    loadData();
  }, []);

  const handleNext = async () => {
    setError(null);
    
    if (activeStep === 1) {
      // Валидация навыков
      if (!isStepReady(1)) {
        if (masterRole === 'print') {
          if (selectedTechnologies.length === 0) setError('Необходимо выбрать технологии');
          else if (selectedTechnologies.some(id => equipmentTypes.find(t => t.id === id)?.type === 'FDM') && selectedMaterials.length === 0) setError('Необходимо выбрать материалы');
          else if (selectedPrintingArea === null) setError('Необходимо выбрать размер печати');
        } else if (masterRole === 'modeling') {
          if (selectedModelingDirections.length === 0) setError('Необходимо выбрать основные направления');
          else if (selectedCadIds.length === 0) setError('Необходимо выбрать CAD программы');
        } else if (masterRole === 'universal') {
          if (selectedTechnologies.length === 0) setError('Необходимо выбрать технологии');
          else if (selectedTechnologies.some(id => equipmentTypes.find(t => t.id === id)?.type === 'FDM') && selectedMaterials.length === 0) setError('Необходимо выбрать материалы');
          else if (selectedPrintingArea === null) setError('Необходимо выбрать размер печати');
          else if (selectedModelingDirections.length === 0) setError('Необходимо выбрать основные направления');
          else if (selectedCadIds.length === 0) setError('Необходимо выбрать CAD программы');
        }
        return;
      }

      // Валидация на сервере
      try {
        const contractorData = {
          can_model: masterRole === 'modeling' || masterRole === 'universal',
          can_print: masterRole === 'print' || masterRole === 'universal',
          printing_experience: printingExperience,
          modeling_experience: modelingExperience,
          cad_ids: selectedCadIds,
          city_id: selectedCityId || 1,
          printing_direction_ids: [],
          modeling_direction_ids: selectedModelingDirections
        };

        await validateContractor(contractorData);
      } catch (err: any) {
        if (err.details && err.details.errors) {
          const errorMessages: string[] = [];
          Object.entries(err.details.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              errorMessages.push(...messages);
            }
          });
          setError(errorMessages.join(', '));
        } else {
          setError(err.message || 'Ошибка валидации');
        }
        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    // Дополнительная валидация перед отправкой
    if (!nickname.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Все поля должны быть заполнены');
      setSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      setSubmitting(false);
      return;
    }

    if (!agree) {
      setError('Необходимо согласиться на обработку персональных данных');
      setSubmitting(false);
      return;
    }

    try {
      const payload: ShopRegisterPayload = {
        fio: nickname, // Сервер требует поле fio
        nickname,
        email,
        password,
        password_confirmation: confirmPassword,
        role: 'contractor',
        can_model: masterRole === 'modeling' || masterRole === 'universal',
        can_print: masterRole === 'print' || masterRole === 'universal',
        printing_experience: (masterRole === 'print' || masterRole === 'universal') ? printingExperience : null,
        modeling_experience: (masterRole === 'modeling' || masterRole === 'universal') ? modelingExperience : null,
        cad_ids: selectedCadIds.length > 0 ? selectedCadIds : (masterRole === 'modeling' || masterRole === 'universal' ? [1] : []),
        city_id: selectedCityId || 1,
        printing_direction_ids: [],
        modeling_direction_ids: selectedModelingDirections.length > 0 ? selectedModelingDirections : (masterRole === 'modeling' || masterRole === 'universal' ? [1] : []),
        equipments: []
      };

      console.log('Registration payload:', payload);
      await registerShopAccount(payload);
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.details && err.details.errors) {
        const errorMessages: string[] = [];
        Object.entries(err.details.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            errorMessages.push(`${field}: ${messages.join(', ')}`);
          }
        });
        setError(errorMessages.join('; '));
      } else {
        setError(err.message || 'Ошибка регистрации');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3, 
            width: '100%', 
            maxWidth: 500,
            minHeight: 'auto',
            justifyContent: 'flex-start'
          }}>
            <TextField
              label='Имя'
              variant='outlined'
              fullWidth
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              sx={autofillStyles}
            />
            <TextField
              label='E-mail'
              variant='outlined'
              fullWidth
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={autofillStyles}
            />
            <Autocomplete
              options={cities}
              getOptionLabel={(option) => option.name}
              value={cities.find(city => city.id === selectedCityId) || null}
              onChange={(event, newValue) => {
                setSelectedCityId(newValue ? newValue.id : '');
              }}
              filterOptions={(options, { inputValue }) => {
                return options.filter(option =>
                  option.name.toLowerCase().includes(inputValue.toLowerCase())
                );
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Город"
                  variant="outlined"
                  fullWidth
                  placeholder="Начните вводить название города..."
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'off',
                  }}
                />
              )}
              noOptionsText="Город не найден"
              clearOnEscape
              selectOnFocus
              handleHomeEndKeys
            />
            <TextField
              label='Пароль'
              variant='outlined'
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={autofillStyles}
            />
            <TextField
              label='Подтвердите пароль'
              variant='outlined'
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={autofillStyles}
            />
            <FormControlLabel
              control={<Checkbox checked={agree} onChange={e => setAgree(e.target.checked)} color="primary" />}
              label="Я согласен на обработку персональных данных"
            />
          </Box>
        );
      
      case 1:
        return (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3, 
            width: '100%', 
            maxWidth: 500,
            minHeight: 'auto',
            justifyContent: 'flex-start'
          }}>
            <FormControl fullWidth>
              <InputLabel>Умение</InputLabel>
              <Select
                value={masterRole}
                onChange={(e) => setMasterRole(e.target.value as 'print' | 'modeling' | 'universal')}
                label="Умение"
              >
                <MenuItem value="print">Печать</MenuItem>
                <MenuItem value="modeling">Моделирование</MenuItem>
                <MenuItem value="universal">Универсал</MenuItem>
              </Select>
            </FormControl>

            {(masterRole === 'print' || masterRole === 'universal') && (
              <>
                <FormControl fullWidth>
                  <InputLabel>Технология</InputLabel>
                  <Select
                    multiple
                    value={selectedTechnologies}
                    onChange={(e) => setSelectedTechnologies(Array.isArray(e.target.value) ? e.target.value : [])}
                    label="Технология"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={equipmentTypes.find(t => t.id === value)?.type || value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                          width: 'auto',
                        },
                      },
                    }}
                  >
                    {equipmentTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedTechnologies.some(id => equipmentTypes.find(t => t.id === id)?.type === 'FDM') && (
                  <FormControl fullWidth>
                    <InputLabel>Основные материалы</InputLabel>
                    <Select
                      multiple
                      value={selectedMaterials}
                      onChange={(e) => setSelectedMaterials(Array.isArray(e.target.value) ? e.target.value : [])}
                      label="Основные материалы"
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={materials.find(m => m.id === value)?.name || value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 300,
                            width: 'auto',
                          },
                        },
                      }}
                    >
                      {materials.map((material) => (
                        <MenuItem key={material.id} value={material.id}>
                          {material.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <FormControl fullWidth>
                  <InputLabel>Размер печати</InputLabel>
                  <Select
                    value={selectedPrintingArea || ''}
                    onChange={(e) => setSelectedPrintingArea(e.target.value as number)}
                    label="Размер печати"
                  >
                    {printingAreas.map((area) => (
                      <MenuItem key={area.id} value={area.id}>
                        {area.area}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}


            {(masterRole === 'modeling' || masterRole === 'universal') && (
              <FormControl fullWidth>
                <InputLabel>CAD программы</InputLabel>
                <Select
                  multiple
                  value={selectedCadIds}
                  onChange={(e) => setSelectedCadIds(Array.isArray(e.target.value) ? e.target.value : [])}
                  label="CAD программы"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={cads.find(c => c.id === value)?.name || value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: 'auto',
                      },
                    },
                  }}
                >
                  {cads.map((cad) => (
                    <MenuItem key={cad.id} value={cad.id}>
                      {cad.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {(masterRole === 'modeling' || masterRole === 'universal') && (
              <FormControl fullWidth>
                <InputLabel>Основные направления</InputLabel>
                <Select
                  multiple
                  value={selectedModelingDirections}
                  onChange={(e) => setSelectedModelingDirections(Array.isArray(e.target.value) ? e.target.value : [])}
                  label="Основные направления"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={
                          modelingDirections.find(d => d.id === value)?.name || value
                        } />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: 'auto',
                      },
                    },
                  }}
                >
                  {modelingDirections.map((direction) => (
                    <MenuItem key={direction.id} value={direction.id}>
                      {direction.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {(masterRole === 'modeling' || masterRole === 'universal') && (
              <FormControlLabel
                control={<Checkbox checked={workWithDrawings} onChange={e => setWorkWithDrawings(e.target.checked)} color="primary" />}
                label="Работа с чертежами"
              />
            )}

            {(masterRole === 'modeling' || masterRole === 'universal') && (
              <FormControl fullWidth>
                <InputLabel>Опыт моделирования</InputLabel>
                <Select
                  value={modelingExperience}
                  onChange={(e) => setModelingExperience(e.target.value as 'under_1_year' | 'from_1_to_3_years' | 'over_3_years')}
                  label="Опыт моделирования"
                >
                  {modelingExperienceOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {(masterRole === 'print' || masterRole === 'universal') && (
              <FormControl fullWidth>
                <InputLabel>Опыт печати</InputLabel>
                <Select
                  value={printingExperience}
                  onChange={(e) => setPrintingExperience(e.target.value as 'under_1_year' | 'from_1_to_3_years' | 'over_3_years')}
                  label="Опыт печати"
                >
                  {printingExperienceOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>
        );
      
      case 2:
        return (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3, 
            width: '100%', 
            maxWidth: 500,
            minHeight: 'auto',
            justifyContent: 'flex-start'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Подтверждение</Typography>
            
            <Box sx={{ 
              border: '1px solid #e0e0e0', 
              borderRadius: 2, 
              p: 4, 
              width: '100%',
              backgroundColor: '#f9f9f9'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Личная информация</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Имя: {nickname}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Email: {email}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Город: {cities.find(c => c.id === selectedCityId)?.name || 'Не выбран'}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Роль: {
                masterRole === 'print' ? 'Печатник' : 
                masterRole === 'modeling' ? 'Моделировщик' : 'Универсал'
              }</Typography>
            </Box>

            <Box sx={{ 
              border: '1px solid #e0e0e0', 
              borderRadius: 2, 
              p: 4, 
              width: '100%',
              backgroundColor: '#f9f9f9'
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Навыки</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Умение: {
                masterRole === 'print' ? 'Печать' : 
                masterRole === 'modeling' ? 'Моделирование' : 'Универсал'
              }</Typography>
              
              {(masterRole === 'print' || masterRole === 'universal') && (
                <>
                  <Typography variant="body2" sx={{ mb: 1 }}>Технологии: {
                    selectedTechnologies.map(id => equipmentTypes.find(t => t.id === id)?.type).join(', ')
                  }</Typography>
                  {selectedTechnologies.some(id => equipmentTypes.find(t => t.id === id)?.type === 'FDM') && (
                    <Typography variant="body2" sx={{ mb: 1 }}>Материалы: {
                      selectedMaterials.map(id => materials.find(m => m.id === id)?.name).join(', ')
                    }</Typography>
                  )}
                  <Typography variant="body2" sx={{ mb: 1 }}>Размер печати: {
                    printingAreas.find(a => a.id === selectedPrintingArea)?.area
                  }</Typography>
                </>
              )}
              
              {(masterRole === 'modeling' || masterRole === 'universal') && (
                <>
                  <Typography variant="body2" sx={{ mb: 1 }}>Основные направления: {
                    selectedModelingDirections.map(id => 
                      modelingDirections.find(d => d.id === id)?.name || id
                    ).join(', ')
                  }</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>CAD программы: {
                    selectedCadIds.map(id => cads.find(c => c.id === id)?.name).join(', ')
                  }</Typography>
                </>
              )}
              {(masterRole === 'print' || masterRole === 'universal') && (
                <Typography variant="body2" sx={{ mb: 1 }}>Опыт печати: {
                  printingExperienceOptions.find(o => o.value === printingExperience)?.label
                }</Typography>
              )}
              {(masterRole === 'modeling' || masterRole === 'universal') && (
                <Typography variant="body2" sx={{ mb: 1 }}>Опыт моделирования: {
                  modelingExperienceOptions.find(o => o.value === modelingExperience)?.label
                }</Typography>
              )}
              
              {(masterRole === 'modeling' || masterRole === 'universal') && workWithDrawings && (
                <Typography variant="body2" sx={{ mb: 1 }}>Работа с чертежами: Да</Typography>
              )}
            </Box>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <div className={styles.loginBg} />
      <div className={styles.loginPageWrapper}>
        <div className={styles.loginCard}  style={{ paddingTop: '120px' }}>
          <div className={styles.loginLogoBlock}>
            <img src={logoImg} alt="logo" className={styles.loginLogo} />
          </div>
          
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 500 }}>
            Регистрация мастера
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Регистрация успешна. Перенаправляем...
            </Alert>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3, 
            width: '100%', 
            maxWidth: 600,
            alignItems: 'center',
            minHeight: 'auto',
            flex: '1 1 auto',
            marginTop: 4
          }}>
            {renderStepContent(activeStep)}
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 2,
            mt: 4,
            alignItems: 'center'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 400 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                sx={{
                  borderColor: '#7A6EB0',
                    color: '#9163FF',
                  fontSize: '18px',
                  py: 2,
                  px: 4,
                  minWidth: '120px',
                  borderRadius: 2,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#5B4C9D',
                    backgroundColor: 'rgba(122, 110, 176, 0.04)'
                  }
                }}
              >
                Назад
              </Button>
              
              <Box sx={{ flex: '1 1 auto' }} />
              
              {activeStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  disabled={submitting}
                  sx={{
                    fontSize: '18px',
                    py: 2,
                    px: 4,
                    minWidth: '180px',
                    borderRadius: 2,
                    textTransform: 'none',
                    background: '#9163FF',
                    '&:hover': { background: '#5B4C9D' }
                  }}
                >
                  {submitting ? 'Регистрация...' : 'Зарегистрироваться'}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  disabled={!isStepReady(activeStep)}
                  sx={{
                    fontSize: '18px',
                    py: 2,
                    px: 4,
                    minWidth: '120px',
                    borderRadius: 2,
                    textTransform: 'none',
                    background: isStepReady(activeStep) ? '#9163FF' : '#ccc',
                    '&:hover': { 
                      background: isStepReady(activeStep) ? '#5B4C9D' : '#ccc'
                    },
                    '&:disabled': {
                      background: '#ccc',
                      color: '#666'
                    }
                  }}
                >
                  Далее
                </Button>
              )}
            </Box>
            
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography sx={{ fontSize: 14, color: '#666', mb: 2 }}>
                Уже зарегистрированы?{' '}
                <Link to="/login" style={{ color: '#7A6EB0', textDecoration: 'none', fontWeight: 500 }}>
                  Войти
                </Link>
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#666' }}>
                Хотите зарегистрироваться как заказчик?{' '}
                <Link to="/register" style={{ color: '#7A6EB0', textDecoration: 'none', fontWeight: 500 }}>
                  Регистрация заказчика
                </Link>
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ContractorRegister;