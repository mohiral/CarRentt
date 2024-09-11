import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 transition-margin duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="p-4">
          <Outlet />  {/* This is where nested routes will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
