import React, { lazy, Suspense } from 'react';

const LazyPieChart = lazy(() => import('./PieChart'));

const PieChart = props => (
  <Suspense fallback={null}>
    <LazyPieChart {...props} />
  </Suspense>
);

export default PieChart;
