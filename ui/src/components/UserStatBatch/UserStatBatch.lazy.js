import React, { lazy, Suspense } from 'react';

const LazyUserStatBatch = lazy(() => import('./UserStatBatch'));

const UserStatBatch = props => (
  <Suspense fallback={null}>
    <LazyUserStatBatch {...props} />
  </Suspense>
);

export default UserStatBatch;
