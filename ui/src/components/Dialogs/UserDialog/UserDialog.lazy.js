import React, { lazy, Suspense } from 'react';

const LazyUserDialog = lazy(() => import('./UserDialog'));

const UserDialog = props => (
  <Suspense fallback={null}>
    <LazyUserDialog {...props} />
  </Suspense>
);

export default UserDialog;
