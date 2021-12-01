import React, { lazy, Suspense } from 'react';

const LazyClients = lazy(() => import('./Clients'));

const Clients = props => (
  <Suspense fallback={null}>
    <LazyClients {...props} />
  </Suspense>
);

export default Clients;
