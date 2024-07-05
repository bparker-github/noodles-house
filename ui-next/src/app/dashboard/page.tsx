'use client';

import { useAuthContext } from '@/context/authContext';
import { Fragment } from 'react';

export default function BasePage() {
  const authContext = useAuthContext();

  console.log('Auth Context?:', authContext);

  return (
    <Fragment>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2>Hello there</h2>
          <p>Lorem Ipsum goes here maybe.</p>
        </div>
      </main>
    </Fragment>
  );
}
