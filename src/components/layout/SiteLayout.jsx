import React from 'react';
import { Outlet } from 'react-router-dom';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import LiveEditToggle from '@/components/shared/LiveEditToggle';

const SiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <SiteFooter />
      <LiveEditToggle />
    </div>
  );
};

export default SiteLayout;