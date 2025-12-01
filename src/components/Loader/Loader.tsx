import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
	size?: 'small' | 'medium' | 'large';
	text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
	size = 'medium',
	text 
}) => {
	return (
		<div className={styles.loaderContainer}>
			<div className={`${styles.spinner} ${styles[`spinner--${size}`]}`}>
				<div className={styles.spinnerCircle}></div>
				<div className={styles.spinnerCircle}></div>
				<div className={styles.spinnerCircle}></div>
			</div>
			{text && <p className={styles.loaderText}>{text}</p>}
		</div>
	);
};

export default Loader;



