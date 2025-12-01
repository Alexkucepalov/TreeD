import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Description3DPrint from '../components/Description3DPrint';
import Advantages from '../components/Advantages';
import HowItWorks from '../components/HowItWorks';
import BestPerformers from '../components/BestPerformers';
import NewsCarousel from '../components/NewsCarousel';
import PricingPlans from '../components/PricingPlans';
import WorkshopMap from '../components/WorkshopMap';
import Footer from '../components/Footer';
import styles from '../app/app.module.scss';

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
