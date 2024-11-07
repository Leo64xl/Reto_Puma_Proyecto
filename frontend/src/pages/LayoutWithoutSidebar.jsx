import React from 'react';
import NavbarHome from '../components/NavbarHome';
import '../styles/Navbar.css';

const LayoutWithoutSidebar = ({ children }) => {
  return (
    <React.Fragment>
      <NavbarHome />
      <div className="section1"></div>
      <div style={{ minHeight: "100vh", backgroundColor: '#0A0A0A' }}>
        <main>{children}</main>
      </div>
    </React.Fragment>
  );
};

export default LayoutWithoutSidebar;