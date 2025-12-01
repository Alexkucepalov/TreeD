import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import {
	Advantages,
	Hero,
	Description3DPrint,
	HowItWorks,
	BestPerformers,
	NewsCarousel,
	PricingPlans,
	WorkshopMap,
} from '../components';
import styles from '@app/app.module.scss';

const Home = () => {
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<Header />
				<Hero />
				<Description3DPrint />
				<HowItWorks />
				<Advantages />
				<BestPerformers />
				<PricingPlans />
				<NewsCarousel />
				<WorkshopMap />
				<Footer />
			</div>
		</div>
	);
};

export default Home;

