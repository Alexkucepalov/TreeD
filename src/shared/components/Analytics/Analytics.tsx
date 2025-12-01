import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { AnalyticsCard } from '@components/ui';
import styles from './Analytics.module.scss';

type Period = 'месяц' | 'квартал' | 'год';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('месяц');

  // Данные для линейного графика
  const lineChartData = [
    { day: 1, value: 500 },
    { day: 2, value: 750 },
    { day: 3, value: 600 },
    { day: 4, value: 800 },
    { day: 5, value: 900 },
    { day: 6, value: 1000 },
    { day: 7, value: 850 },
    { day: 8, value: 950 },
    { day: 9, value: 2000 },
    { day: 10, value: 1200 },
    { day: 11, value: 2500 },
    { day: 12, value: 1100 },
    { day: 13, value: 2500 },
    { day: 14, value: 1400 },
    { day: 15, value: 3000 },
    { day: 16, value: 1500 },
    { day: 17, value: 1600 },
    { day: 18, value: 5000 },
    { day: 19, value: 1700 },
    { day: 20, value: 1800 },
    { day: 21, value: 1600 },
    { day: 22, value: 1900 },
    { day: 23, value: 2000 },
    { day: 24, value: 7000 },
    { day: 25, value: 2100 },
    { day: 26, value: 2200 },
    { day: 27, value: 2000 },
    { day: 28, value: 2300 },
    { day: 29, value: 2400 },
    { day: 30, value: 27000 },
  ];

  // Данные для столбчатого графика
  const barChartData = [
    { day: 'Пн', value: 20000 },
    { day: 'Вт', value: 30000 },
    { day: 'Ср', value: 25000 },
    { day: 'Чт', value: 40000 },
    { day: 'Пт', value: 35000 },
    { day: 'Сб', value: 4500 },
    { day: 'ВС', value: 40000 },
  ];

  // Данные для круговой диаграммы
  const pieChartData = [
    { name: '10%', value: 10, color: '#9163ff' },
    { name: '20%', value: 20, color: '#b794f6' },
    { name: '50%', value: 50, color: '#d3c7ff' },
    { name: '20%', value: 20, color: '#e8dfff' },
  ];

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.analyticsHeader}>
        <div className={styles.title}>Подробная аналитика</div>
        <div className={styles.periodSelector}>
          <div
            className={`${styles.periodButton} ${selectedPeriod === 'месяц' ? styles.active : ''}`}
            onClick={() => setSelectedPeriod('месяц')}
          >
            <div className={styles.periodButtonText}>месяц</div>
          </div>
          <div
            className={`${styles.periodButtonInactive} ${selectedPeriod === 'квартал' ? styles.active : ''}`}
            onClick={() => setSelectedPeriod('квартал')}
          >
            <div className={styles.periodButtonTextInactive}>квартал</div>
          </div>
          <div
            className={`${styles.periodButtonInactive} ${selectedPeriod === 'год' ? styles.active : ''}`}
            onClick={() => setSelectedPeriod('год')}
          >
            <div className={styles.periodButtonTextInactive}>год</div>
          </div>
        </div>
      </div>

      <div className={styles.analyticsGrid}>
        {/* Первая строка: Линейный график слева, AnalyticsCard справа */}
        <div className={styles.lineChartContainer}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>ВЫРУЧКА за ноябрь</div>
            <div className={styles.chartControls}>
              <div
                className={`${styles.periodButton} ${selectedPeriod === 'месяц' ? styles.active : ''}`}
                onClick={() => setSelectedPeriod('месяц')}
              >
                <div className={styles.periodButtonText}>месяц</div>
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <ResponsiveContainer width="100%" height={300} >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <AreaChart data={lineChartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <XAxis 
                fontSize={16}
                dataKey="day" 
                stroke="#ffffff"
                tick={{ fill: '#ffffff' }}
                padding={{ left: 0, right: 0 }}
              />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <YAxis 
                fontSize={16}
                stroke="#ffffff"
                tick={{ fill: '#ffffff' }}
                domain={[0, 'dataMax']}
                allowDataOverflow={false}
                
                padding={{ top: 10, bottom: 0 }}
              />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: 'none',
                  color: '#ffffff'
                }}
              />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#ffffff" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.revenueCard}>
          <AnalyticsCard variant="variant3" />
        </div>

        {/* Вторая строка: Столбчатый график, круговая диаграмма и блок рекомендаций */}
        <div className={styles.barChartContainer}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitle}>ВЫРУЧКА за ноябрь</div>
            <div className={styles.chartControls}>
              <div
                className={`${styles.periodButton} ${selectedPeriod === 'месяц' ? styles.active : ''}`}
                onClick={() => setSelectedPeriod('месяц')}
              >
                <div className={styles.periodButtonText}>месяц</div>
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <ResponsiveContainer width="100%" height={250}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <BarChart data={barChartData}>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <XAxis 
                fontSize={16}
                dataKey="day" 
                stroke="#ffffff"
                tick={{ fill: '#ffffff' }}
                padding={{ left: 0, right: 0 }}
              />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <YAxis 
                fontSize={16}
                stroke="#ffffff"
                tick={{ fill: '#ffffff' }}
                domain={[0, 'dataMax']}
                allowDataOverflow={false}
                padding={{ top: 10, bottom: 0 }}
              />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: 'none',
                  color: '#ffffff'
                }}
              />
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Bar dataKey="value" fill="#ffffff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.pieChartContainer}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <ResponsiveContainer width="100%" height={400}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <PieChart>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                label={({ percent }) => percent ? `${(percent * 100).toFixed(0)}%` : ''}
                labelLine={false}
              >
                {pieChartData.map((entry, index) => (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Блок с рекомендациями и метриками роста */}
        <div className={styles.recommendationsBlock}>
          <div className={styles.metricGrowthBlock}>
            <div className={styles.metricRow}>
              <div className={styles.metricInfo}>
                <div className={styles.metricTitle}>За этот период</div>
                <div className={styles.metricDescription}>что то выросло так то так</div>
              </div>
              <div className={styles.metricValue}>+5%</div>
            </div>
            <div className={styles.divider}></div>
          </div>
          <div className={styles.secondMetricBlock}>
            <div className={styles.secondMetricRow}>
              <div className={styles.metricRow}>
                <div className={styles.metricInfo}>
                  <div className={styles.metricTitle}>За этот период</div>
                  <div className={styles.metricDescription}>что то выросло так то так</div>
                </div>
                <div className={styles.metricValue}>+5%</div>
              </div>
              <div className={styles.divider}></div>
            </div>
          </div>
          <div className={styles.recommendationsTextBlock}>
            <div className={styles.recommendationsTitle}>Рекомендации</div>
            <div className={styles.recommendationsText}>
              Так можно быстро делать прототипы, индивидуальные имплантаты, модели
              зданий, восстанавливать сломанные детали, а ещё создавать уникальные
              предметы интерьера, игрушки, аксессуары
              <br />
              и кастомные запчасти.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;


