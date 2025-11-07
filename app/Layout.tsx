import React from 'react';
import { Outlet } from 'react-router';

export function Layout() {
  return (
    <main className="h-screen w-full overflow-x-hidden container mx-auto ">
      <Outlet />
    </main>
  );
}
