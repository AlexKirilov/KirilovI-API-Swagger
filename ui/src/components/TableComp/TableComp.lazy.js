import React, { lazy, Suspense } from 'react';

const LazyTableComp = lazy(() => import('./TableComp'));

const TableComp = props => (
  <Suspense fallback={null}>
    <LazyTableComp {...props} />
  </Suspense>
);

export default TableComp;
