import React, { useState, useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './Orders.module.scss';
import lineIcon from '@app/assets/icon/line.svg';
import cardIcon from '@app/assets/icon/card.svg';
import avatarIcon2 from '@app/assets/icon/avatar (2).svg';
import avatarIcon3 from '@app/assets/icon/avatar (3).svg';
import { Chips } from '@components/ui';

type ViewMode = 'grid' | 'card';

interface Order {
  id: number;
  title: string;
  type: string;
  customer: string;
  customerInitial: string;
  deadline: string;
  budget: string;
  status: string;
  statusColor: string;
  statusTextColor: string;
  borderColor: string;
  hasOnline?: boolean;
  date?: string;
  statusText?: string;
  statusTextColor2?: string;
}

const Orders: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');

  // Данные для табличного вида
  const gridOrders: Order[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Создать 3D-макет аниме фигурки',
        type: 'PETG',
        customer: 'Студия скуфов',
        customerInitial: 'S',
        deadline: '12.10.2025',
        budget: '12 000 ₽',
        status: 'В процессе',
        statusColor: '#ffcfaa',
        statusTextColor: '#ff7733',
        borderColor: '#9163ff',
        hasOnline: false,
      },
      {
        id: 2,
        title: 'Создать прототип корпуса устройства',
        type: 'SLA',
        customer: 'ТехноЛаб',
        customerInitial: 'T',
        deadline: '20.11.2024',
        budget: '45 000 ₽',
        status: 'Готово',
        statusColor: '#cbffce',
        statusTextColor: '#4dca53',
        borderColor: '#4dca53',
        hasOnline: false,
      },
      {
        id: 3,
        title: 'Распечатать макет гнома',
        type: 'ABS',
        customer: 'Гном Гномыч',
        customerInitial: 'G',
        deadline: '15.11.2024',
        budget: '25 000 ₽',
        status: 'В процессе',
        statusColor: '#ffcfaa',
        statusTextColor: '#ff7733',
        borderColor: '#9163ff',
        hasOnline: false,
      },
      {
        id: 4,
        title: 'Прототип медицинского устройства',
        type: 'TPU',
        customer: 'МедТех',
        customerInitial: 'M',
        deadline: '20.12.2024',
        budget: '120 000 ₽',
        status: 'Отправка',
        statusColor: '#ffcfaa',
        statusTextColor: '#ff7733',
        borderColor: '#9163ff',
        hasOnline: false,
      },
      {
        id: 5,
        title: 'Фигурки для коллекции',
        type: 'SLA',
        customer: 'Коллекционер',
        customerInitial: 'K',
        deadline: '15.12.2024',
        budget: '15 000 ₽',
        status: 'В процессе',
        statusColor: '#ffcfaa',
        statusTextColor: '#ff7733',
        borderColor: '#9163ff',
        hasOnline: false,
      },
      {
        id: 6,
        title: 'Печать деталей для робота',
        type: 'TPU',
        customer: 'РобоТех',
        customerInitial: 'R',
        deadline: '25.11.2024',
        budget: '80 000 ₽',
        status: 'В процессе',
        statusColor: '#ffcfaa',
        statusTextColor: '#ff7733',
        borderColor: '#9163ff',
        hasOnline: false,
      },
      {
        id: 7,
        title: 'Макет архитектурного проекта',
        type: 'PETG',
        customer: 'АрхСтудия',
        customerInitial: 'A',
        deadline: '10.12.2024',
        budget: '60 000 ₽',
        status: 'Готово',
        statusColor: '#cbffce',
        statusTextColor: '#4dca53',
        borderColor: '#4dca53',
        hasOnline: false,
      },
      {
        id: 8,
        title: 'Прототип электронного устройства',
        type: 'ABS',
        customer: 'ЭлектроТех',
        customerInitial: 'E',
        deadline: '05.12.2024',
        budget: '35 000 ₽',
        status: 'В процессе',
        statusColor: '#ffcfaa',
        statusTextColor: '#ff7733',
        borderColor: '#9163ff',
        hasOnline: false,
      },
      {
        id: 9,
        title: 'Детали для дрона',
        type: 'TPU',
        customer: 'ДронТех',
        customerInitial: 'D',
        deadline: '18.12.2024',
        budget: '90 000 ₽',
        status: 'Отправка',
        statusColor: '#ffcfaa',
        statusTextColor: '#ff7733',
        borderColor: '#9163ff',
        hasOnline: false,
      },
      {
        id: 10,
        title: 'Игрушки для детей',
        type: 'PETG',
        customer: 'ИгрушкиМир',
        customerInitial: 'I',
        deadline: '22.12.2024',
        budget: '20 000 ₽',
        status: 'Готово',
        statusColor: '#cbffce',
        statusTextColor: '#4dca53',
        borderColor: '#4dca53',
        hasOnline: false,
      },
      {
        id: 11,
        title: 'Прототип корпуса смартфона',
        type: 'SLA',
        customer: 'ТехноСмарт',
        customerInitial: 'T',
        deadline: '28.12.2024',
        budget: '55 000 ₽',
        status: 'В процессе',
        statusColor: '#ffcfaa',
        statusTextColor: '#ff7733',
        borderColor: '#9163ff',
        hasOnline: false,
      },
      {
        id: 12,
        title: 'Детали для автомобиля',
        type: 'ABS',
        customer: 'АвтоМастер',
        customerInitial: 'A',
        deadline: '30.12.2024',
        budget: '75 000 ₽',
        status: 'Готово',
        statusColor: '#cbffce',
        statusTextColor: '#4dca53',
        borderColor: '#4dca53',
        hasOnline: false,
      },
    ],
    []
  );

  // Данные для карточного вида
  const cardOrders: Order[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Создать 3D-макет аниме фигурки',
        type: 'PETG',
        customer: 'ДимДимыч из Фиксиков',
        customerInitial: 'F',
        date: '12 окт 2025',
        deadline: '12.10.2025',
        budget: '12 000 ₽',
        status: 'Готово',
        statusColor: '#cbffce',
        statusTextColor: '#4dca53',
        statusText: '3 дня до отправки',
        statusTextColor2: '#2988c7',
        borderColor: '#ff7733',
        hasOnline: true,
      },
      {
        id: 2,
        title: 'Создать 3D-макет аниме фигурки',
        type: 'PETG',
        customer: 'ДимДимыч из Фиксиков',
        customerInitial: 'F',
        date: '12 окт 2025',
        deadline: '12.10.2025',
        budget: '12 000 ₽',
        status: 'В процессе',
        statusColor: '#ffeca0',
        statusTextColor: '#deb100',
        statusText: 'Осталось 7 дней',
        statusTextColor2: '#2988c7',
        borderColor: '#ff7733',
        hasOnline: true,
      },
      {
        id: 3,
        title: 'Распечатать макет гнома',
        type: 'PETG',
        customer: 'Гном Гномыч',
        customerInitial: 'G',
        date: '12 окт 2025',
        deadline: '12.10.2025',
        budget: '12 000 ₽',
        status: 'В процессе',
        statusColor: '#ffeca0',
        statusTextColor: '#deb100',
        statusText: 'Просрочено',
        statusTextColor2: '#e03b3b',
        borderColor: '#9163ff',
        hasOnline: true,
      },
      {
        id: 4,
        title: 'Создать прототип корпуса устройства',
        type: 'SLA',
        customer: 'ТехноЛаб',
        customerInitial: 'T',
        date: '20 ноя 2024',
        deadline: '20.11.2024',
        budget: '45 000 ₽',
        status: 'Готово',
        statusColor: '#cbffce',
        statusTextColor: '#4dca53',
        statusText: 'Готов к выдаче',
        statusTextColor2: '#4dca53',
        borderColor: '#4dca53',
        hasOnline: false,
      },
      {
        id: 5,
        title: 'Печать деталей для робота',
        type: 'TPU',
        customer: 'РобоТех',
        customerInitial: 'R',
        date: '25 ноя 2024',
        deadline: '25.11.2024',
        budget: '80 000 ₽',
        status: 'В процессе',
        statusColor: '#ffeca0',
        statusTextColor: '#deb100',
        statusText: 'Осталось 5 дней',
        statusTextColor2: '#2988c7',
        borderColor: '#ff7733',
        hasOnline: true,
      },
      {
        id: 6,
        title: 'Фигурки для коллекции',
        type: 'SLA',
        customer: 'Коллекционер',
        customerInitial: 'K',
        date: '15 дек 2024',
        deadline: '15.12.2024',
        budget: '15 000 ₽',
        status: 'В процессе',
        statusColor: '#ffeca0',
        statusTextColor: '#deb100',
        statusText: 'Осталось 10 дней',
        statusTextColor2: '#2988c7',
        borderColor: '#9163ff',
        hasOnline: true,
      },
      {
        id: 7,
        title: 'Прототип медицинского устройства',
        type: 'TPU',
        customer: 'МедТех',
        customerInitial: 'M',
        date: '20 дек 2024',
        deadline: '20.12.2024',
        budget: '120 000 ₽',
        status: 'Отправка',
        statusColor: '#ffcfaa',
        statusTextColor: '#ff7733',
        statusText: 'В пути',
        statusTextColor2: '#2988c7',
        borderColor: '#9163ff',
        hasOnline: true,
      },
      {
        id: 8,
        title: 'Макет архитектурного проекта',
        type: 'PETG',
        customer: 'АрхСтудия',
        customerInitial: 'A',
        date: '10 дек 2024',
        deadline: '10.12.2024',
        budget: '60 000 ₽',
        status: 'Готово',
        statusColor: '#cbffce',
        statusTextColor: '#4dca53',
        statusText: 'Готов к выдаче',
        statusTextColor2: '#4dca53',
        borderColor: '#4dca53',
        hasOnline: false,
      },
      {
        id: 9,
        title: 'Прототип электронного устройства',
        type: 'ABS',
        customer: 'ЭлектроТех',
        customerInitial: 'E',
        date: '05 дек 2024',
        deadline: '05.12.2024',
        budget: '35 000 ₽',
        status: 'В процессе',
        statusColor: '#ffeca0',
        statusTextColor: '#deb100',
        statusText: 'Осталось 3 дня',
        statusTextColor2: '#2988c7',
        borderColor: '#9163ff',
        hasOnline: true,
      },
      {
        id: 10,
        title: 'Детали для дрона',
        type: 'TPU',
        customer: 'ДронТех',
        customerInitial: 'D',
        date: '18 дек 2024',
        deadline: '18.12.2024',
        budget: '90 000 ₽',
        status: 'Отправка',
        statusColor: '#ffcfaa',
        statusTextColor: '#ff7733',
        statusText: 'Доставлено',
        statusTextColor2: '#4dca53',
        borderColor: '#9163ff',
        hasOnline: true,
      },
    ],
    []
  );

  // Получаем уникальные статусы и типы для фильтров
  const statuses = useMemo(() => {
    const uniqueStatuses = new Set(gridOrders.map((order) => order.status));
    return Array.from(uniqueStatuses);
  }, [gridOrders]);

  const types = useMemo(() => {
    const uniqueTypes = new Set(gridOrders.map((order) => order.type));
    return Array.from(uniqueTypes);
  }, [gridOrders]);

  // Фильтрация данных
  const filteredGridOrders = useMemo(() => {
    return gridOrders.filter((order) => {
      const matchesStatus = !statusFilter || order.status === statusFilter;
      const matchesType = !typeFilter || order.type === typeFilter;
      return matchesStatus && matchesType;
    });
  }, [gridOrders, statusFilter, typeFilter]);

  const filteredCardOrders = useMemo(() => {
    return cardOrders.filter((order) => {
      const matchesStatus = !statusFilter || order.status === statusFilter;
      const matchesType = !typeFilter || order.type === typeFilter;
      return matchesStatus && matchesType;
    });
  }, [cardOrders, statusFilter, typeFilter]);

  // Функция для получения цвета статуса для Chips
  const getStatusColor = (status: string): 'light-yellow' | 'green' | 'peach' => {
    if (status === 'Готово') return 'green';
    if (status === 'Отправка') return 'peach';
    return 'light-yellow'; // для "В процессе"
  };

  // Колонки для DataGrid
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'title',
        headerName: 'Наименование',
        width: 400,
        flex: 1,
      },
      {
        field: 'type',
        headerName: 'Тип заказа',
        width: 150,
        renderCell: (params) => {
          return <Chips color="purple" size="small">{params.value}</Chips>;
        },
      },
      {
        field: 'customer',
        headerName: 'Заказчик',
        width: 300,
        flex: 1,
        renderCell: (params) => {
          const order = params.row as Order;
          return (
            <div className={styles.tableCustomerCell}>
              <img
                src={avatarIcon2}
                alt={order.customer}
                className={styles.avatarImg}
              />
              <div className={styles.tableCustomerName}>{order.customer}</div>
            </div>
          );
        },
      },
      {
        field: 'deadline',
        headerName: 'Дедлайн',
        width: 150,
        renderCell: (params) => {
          return <div className={styles.tableTypeCell}>{params.value}</div>;
        },
      },
      {
        field: 'budget',
        headerName: 'Бюджет',
        width: 150,
        renderCell: (params) => {
          return <div className={styles.tableTypeCell}>{params.value}</div>;
        },
      },
      {
        field: 'status',
        headerName: 'Статус',
        width: 200,
        renderCell: (params) => {
          const order = params.row as Order;
          return (
            <Chips color={getStatusColor(order.status)} size="small">
              {order.status}
            </Chips>
          );
        },
      },
    ],
    []
  );

  return (
    <div className={styles.ordersContainer}>
      {viewMode === 'grid' ? (
        <>
          <div className={styles.viewModeSwitcher}>
            <div className={styles.ordersTitle}>Заказы</div>
            <div className={styles.viewModeButtonActive} onClick={() => setViewMode('grid')}>
              <img className={styles.grid} src={cardIcon} alt="Grid view" />
            </div>
            <div className={styles.viewModeButtonInactive} onClick={() => setViewMode('card')}>
              <img className={styles.menu} src={lineIcon} alt="Card view" />
            </div>
          </div>
          {/* Фильтры */}
          <div className={styles.filters}>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Все статусы</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              className={styles.filterSelect}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Все типы</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button
              className={styles.clearFilters}
              onClick={() => {
                setStatusFilter('');
                setTypeFilter('');
              }}
            >
              Сбросить фильтры
            </button>
            <div className={styles.resultsCount}>
              Найдено: {filteredGridOrders.length} из {gridOrders.length}
            </div>
          </div>
          <div className={styles.ordersTableContainer}>
            <div className={styles.dataGridWrapper}>
              <DataGrid
                rows={filteredGridOrders}
                columns={columns}
                pageSizeOptions={[5, 10, 25, 50]}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 },
                  },
                }}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableRowSelectionOnClick
                hideFooterSelectedRowCount
                disableColumnMenu
                sx={{
                  border: 'none',
                  '& .MuiDataGrid-main': {
                    border: 'none',
                  },
                  '& .MuiDataGrid-cell': {
                    borderBottom: '1px solid #f0f0f0',
                    padding: '15px 10px',
                    fontFamily: '"Montserrat-Medium", sans-serif',
                    fontSize: '16px',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    '& > *': {
                      display: 'flex',
                      alignItems: 'center',
                    },
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#ffffff !important',
                    background: '#ffffff !important',
                    borderBottom: '1px solid #e0e0e0',
                    color: '#c4c4c4',
                    fontFamily: '"Montserrat-Regular", sans-serif',
                    fontSize: '16px',
                    fontWeight: 400,
                    padding: '10px',
                    boxShadow: 'none',
                    '& .MuiDataGrid-columnHeaderTitle': {
                      fontWeight: 400,
                    },
                    '& .MuiDataGrid-columnHeader': {
                      backgroundColor: '#ffffff !important',
                      background: '#ffffff !important',
                      '&:hover': {
                        backgroundColor: '#ffffff !important',
                        background: '#ffffff !important',
                      },
                      '&:focus': {
                        backgroundColor: '#ffffff !important',
                        background: '#ffffff !important',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#ffffff !important',
                        background: '#ffffff !important',
                      },
                    },
                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                      backgroundColor: '#ffffff !important',
                      background: '#ffffff !important',
                    },
                    '& .MuiDataGrid-iconButtonContainer': {
                      backgroundColor: '#ffffff !important',
                      background: '#ffffff !important',
                    },
                  },
                  '& .MuiDataGrid-row': {
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                    },
                  },
                  '& .MuiDataGrid-footerContainer': {
                    borderTop: '1px solid #e0e0e0',
                    minHeight: '52px',
                    '& .MuiTablePagination-root': {
                      color: '#727986',
                      fontFamily: '"Montserrat-Regular", sans-serif',
                      fontSize: '14px',
                    },
                    '& .MuiIconButton-root': {
                      color: '#727986',
                    },
                  },
                  '& .MuiDataGrid-toolbarContainer': {
                    display: 'none',
                  },
                  '& .MuiDataGrid-virtualScroller': {
                    overflowX: 'auto',
                  },
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.cardViewHeader}>
            <div className={styles.cardViewHeaderTop}>
              <div className={styles.ordersTitle}>Заказы</div>
              <div className={styles.viewModeButtonInactive} onClick={() => setViewMode('grid')}>
                <img className={styles.menu} src={cardIcon} alt="Grid view" />
              </div>
              <div className={styles.viewModeButtonActive} onClick={() => setViewMode('card')}>
                <img className={styles.grid} src={lineIcon} alt="Card view" />
              </div>
            </div>
            <div className={styles.cardViewHeaderBottom}>
              <div className={styles.button}>
                <div className={styles.buttonText}>История заказов</div>
              </div>
            </div>
          </div>
          {/* Фильтры для карточного вида */}
          <div className={styles.filters}>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Все статусы</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              className={styles.filterSelect}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Все типы</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button
              className={styles.clearFilters}
              onClick={() => {
                setStatusFilter('');
                setTypeFilter('');
              }}
            >
              Сбросить фильтры
            </button>
            <div className={styles.resultsCount}>
              Найдено: {filteredCardOrders.length} из {cardOrders.length}
            </div>
          </div>
          <div className={styles.cardList}>
            {filteredCardOrders.length === 0 ? (
              <div className={styles.emptyState}>Заказы не найдены</div>
            ) : (
              filteredCardOrders.map((order) => (
                <div key={order.id} className={styles.orderCard}>
                  <div className={styles.orderCardContent}>
                    <div className={styles.orderHeader}>
                      <div className={styles.orderTypeContainer}>
                        <Chips color="purple" size="small">{order.type}</Chips>
                      </div>
                      <div className={styles.orderDateContainer}>
                        <div className={styles.dateText}>{order.date}</div>
                      </div>
                    </div>
                    <div className={styles.orderCustomerSection}>
                      <div className={styles.orderTitleCard}>{order.title}</div>
                      <div className={styles.orderCustomerInfo}>
                        <img
                          src={avatarIcon3}
                          alt={order.customer}
                          className={styles.avatarImg}
                        />
                        <div className={styles.customerName}>{order.customer}</div>
                      </div>
                    </div>
                    <div className={styles.orderDetails}>
                      <div className={styles.orderDetailsRow}>
                        <div className={styles.budgetSection}>
                          <div className={styles.budgetLabel}>
                            <div className={styles.detailLabel}>Бюджет</div>
                          </div>
                          <div className={styles.budgetValue}>
                            <div className={styles.budgetText}>{order.budget}</div>
                          </div>
                        </div>
                        <div className={styles.statusSection}>
                          <div className={styles.statusLabel}>
                            <div className={styles.detailLabel}>Статус</div>
                          </div>
                          <div className={styles.statusValue}>
                            <div className={styles.statusTags}>
                              <Chips color={getStatusColor(order.status)} size="small">
                                {order.status}
                              </Chips>
                              {order.statusText && (
                                <Chips color="blue" size="small">{order.statusText}</Chips>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;

