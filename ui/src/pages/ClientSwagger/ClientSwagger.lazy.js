import React, { lazy, Suspense } from 'react';

const LazyClientSwagger = lazy(() => import('./ClientSwagger'));

const ClientSwagger = props => (
  <Suspense fallback={null}>
    <LazyClientSwagger {...props} />
  </Suspense>
);

export default ClientSwagger;
