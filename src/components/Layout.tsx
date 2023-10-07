import React, { ReactNode } from 'react';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
interface LayoutProps {
    children: ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <SideBar>{children}</SideBar>
      <Outlet/>
    </div>
  );
};

export default Layout;
