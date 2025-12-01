import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logoutUserGet } from '@features/auth/api/authActions';
import { AnalyticsCard } from '@components/ui/analytics-card';
import { PortfolioCard } from '@components/ui/portfolio-card';
import { Chips } from '@components/ui/chips';
import { Status } from '@components/ui/status';
import styles from './MakerDashboard.module.scss';

const MakerDashboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.auth);
	const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

	// Моковые данные заказов - позже будут загружаться с API
	const orders = [
		{
			id: 1,
			title: 'Создать 3D-макет аниме фигурки',
			type: 'PETG',
			customer: 'Студия скуфов',
			deadline: '12.10.2025',
			budget: '12 000 P',
			status: 'В процессе',
		},
		{
			id: 2,
			title: 'Напечатать протез',
			type: 'PETG',
			customer: 'ДимДимыч из Фиксиков',
			deadline: '09.10.2024',
			budget: '100 000 P',
			status: 'Отправка',
		},
	];

	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			await dispatch(logoutUserGet()).unwrap();
			navigate('/login');
		} catch (error) {
			console.error('Ошибка при выходе:', error);
			navigate('/login');
		}
	};

	return (
		<div className={styles.dashboard}>
			<div className={styles.sidebar}>
				<div className={styles.profileCard}>
					<div className={styles.avatar}>
						<div className={styles.avatarLetter}>
							{(user?.nickname || user?.email || 'U').charAt(0).toUpperCase()}
						</div>
						<div className={styles.onlineIndicator}></div>
					</div>
					<h2 className={styles.userName}>{user?.nickname || user?.email || 'User Name'}</h2>
					<div className={styles.tags}>
						<Status variant="maker">Maker</Status>
						<Chips color="gray">Москва</Chips>
					</div>
					<div className={styles.rating}>
						★ 4.9 (13)
					</div>
					<div className={styles.technologies}>
						<h3>Технологии и материалы</h3>
						<div className={styles.techTags}>
							<Chips color="purple">FDM</Chips>
							<Chips color="purple">SLA</Chips>
							<Chips color="purple">PETG</Chips>
							<Chips color="purple">TPU</Chips>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.mainContent}>
				<div className={styles.header}>
					<h1>Дашборд</h1>
					<div className={styles.headerActions}>
						<button onClick={handleLogout}>Выход</button>
					</div>
				</div>

				<div className={styles.analytics}>
					<AnalyticsCard 
						variant="variant1" 
						title="ВЫРУЧКА" 
						subtitle="за 30 дней"
						value="16 054₽"
					/>
					<AnalyticsCard 
						variant="variant2" 
						title="КОЛИЧЕСТВО ЗАКАЗОВ" 
						subtitle="за 30 дней"
						value="1"
					/>
					<div className={styles.subscriptionCard}>
						<p>Хотите лучше понимать тенденции рынка?</p>
						<p>Более подробная аналитика в подписке Maker!</p>
						<button>Оформить подписку</button>
					</div>
				</div>

				<div className={styles.ordersSection}>
					<div className={styles.ordersHeader}>
						<h2>Заказы</h2>
						<div className={styles.viewToggle}>
							<button 
								className={viewMode === 'grid' ? styles.active : ''}
								onClick={() => setViewMode('grid')}
							>
								Grid
							</button>
							<button 
								className={viewMode === 'list' ? styles.active : ''}
								onClick={() => setViewMode('list')}
							>
								List
							</button>
						</div>
					</div>

					{viewMode === 'list' ? (
						<div className={styles.ordersList}>
							<table>
								<thead>
									<tr>
										<th>Наименование</th>
										<th>Тип заказа</th>
										<th>Заказчик</th>
										<th>Дедлайн</th>
										<th>Бюджет</th>
										<th>Статус</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => (
										<tr key={order.id}>
											<td>{order.title}</td>
											<td><Chips color="purple">{order.type}</Chips></td>
											<td>{order.customer}</td>
											<td>{order.deadline}</td>
											<td>{order.budget}</td>
											<td><Status variant="free">{order.status}</Status></td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className={styles.ordersGrid}>
							{orders.map((order) => (
								<div key={order.id} className={styles.orderCard}>
									<div className={styles.orderDate}>{order.deadline}</div>
									<Chips color="purple">{order.type}</Chips>
									<h3>{order.title}</h3>
									<p>{order.customer}</p>
									<div className={styles.orderBudget}>{order.budget}</div>
									<div className={styles.orderStatus}>
										<Status variant="free">{order.status}</Status>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MakerDashboard;


