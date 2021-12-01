import React, { lazy, Suspense } from 'react';

const LazySiteDetails = lazy(() => import('./SiteDetails'));

const SiteDetails = props => (
  <Suspense fallback={null}>
    <LazySiteDetails {...props} />
  </Suspense>
);

export default SiteDetails;
