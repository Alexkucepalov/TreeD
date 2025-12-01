import React, { useState } from 'react';
import { ProfileHeader } from '@features/profile';
import { Filters, FilterState } from '../components/Filters';
import { BriefsList } from '../components/BriefsList';
import styles from './BriefsPage.module.scss';

const BriefsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState | null>(null);

  const handleApplyFilters = (appliedFilters: FilterState) => {
    setFilters(appliedFilters);
    // Здесь можно добавить логику применения фильтров
  };

  return (
    <div className={styles.briefsPage}>
      <ProfileHeader />
      <div className={styles.content}>
        <div className={styles.filtersSection}>
          <Filters onApply={handleApplyFilters} />
        </div>
        <div className={styles.briefsSection}>
          <BriefsList filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default BriefsPage;


