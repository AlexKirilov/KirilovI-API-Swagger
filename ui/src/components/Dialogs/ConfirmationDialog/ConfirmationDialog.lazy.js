import React, { lazy, Suspense } from 'react';

const LazyConfirmationDialog = lazy(() => import('./ConfirmationDialog'));

const ConfirmationDialog = props => (
  <Suspense fallback={null}>
    <LazyConfirmationDialog {...props} />
  </Suspense>
);

export default ConfirmationDialog;
