import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/Navbar.css';

const LayoutWithoutSidebar = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="section1"></div>
      <div style={{ minHeight: "100vh", backgroundColor: '#0A0A0A' }}>
        <main>{children}</main>
      </div>
    </React.Fragment>
  );
};

export default LayoutWithoutSidebar;