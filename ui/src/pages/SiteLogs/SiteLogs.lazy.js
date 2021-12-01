import React, { lazy, Suspense } from 'react';

const LazySiteLogs = lazy(() => import('./SiteLogs'));

const SiteLogs = props => (
  <Suspense fallback={null}>
    <LazySiteLogs {...props} />
  </Suspense>
);

export default SiteLogs;
