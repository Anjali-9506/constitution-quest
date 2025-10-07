import React, { Suspense } from 'react';
import ExploreClient from './explore-client';

/**
 * A fallback component to show while the client component is loading.
 * This can be a simple spinner or a more complex skeleton screen.
 */
function LoadingSkeleton() {
  return (
    <div className="container mx-auto">
      {/* You can create a skeleton layout that mimics your actual page */}
      <div className="mt-8 grid gap-8 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-1 lg:col-span-1">
          {/* Skeleton for Table of Contents */}
          <div className="w-full h-96 bg-muted animate-pulse rounded-lg"></div>
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          {/* Skeleton for Article Display */}
          <div className="w-full h-96 bg-muted animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ExploreClient />
    </Suspense>
  );
}