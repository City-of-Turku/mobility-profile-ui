import React, { ReactNode } from 'react';
import TopBar from '../../TopBar/TopBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      <TopBar />
      <main>
        <div className="content-container">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
