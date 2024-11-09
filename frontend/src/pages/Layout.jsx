import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/Navbar.css';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      if (isSidebarOpen) {
        mainContent.classList.add('sidebar-open');
      } else {
        mainContent.classList.remove('sidebar-open');
      }
    }
  }, [isSidebarOpen]);

  return (
    <React.Fragment>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className='section1'></div>
      <div className="columns" style={{ minHeight: "100vh", backgroundColor: '#0A0A0A' }}>
        <div className={`column is-0 ${isSidebarOpen ? "open" : ""}`}>
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="column main-content">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;