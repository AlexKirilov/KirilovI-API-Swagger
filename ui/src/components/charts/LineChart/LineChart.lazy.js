import React, { lazy, Suspense } from 'react';

const LazyLineChart = lazy(() => import('./LineChart'));

const LineChart = props => (
  <Suspense fallback={null}>
    <LazyLineChart {...props} />
  </Suspense>
);

export default LineChart;
