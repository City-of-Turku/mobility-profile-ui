import React, { ReactNode } from 'react';
import Footer from '../../Footer/Footer';
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
      <Footer />
    </div>
  );
};

export default Layout;
