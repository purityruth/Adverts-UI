import React, { ReactNode } from 'react';
import SideBar from './SideBar';
interface LayoutProps {
    children: ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <SideBar>{children}</SideBar>
    </div>
  );
};

export default Layout;
