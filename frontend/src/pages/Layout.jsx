import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import '../styles/Navbar.css'

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar/>
        <div className='section1'></div>
        <div className="columns" style={{minHeight: "90vh", backgroundColor: '#ffffff'}} > 
            <div className="column is-2" style={{backgroundColor: '#ffffff'}}>
            <Sidebar/>
            </div>
            <div className="column" style={{ backgroundColor: '#f0f0f0', opacity: 0.9 }}>
                <main>{children}</main>
            </div>               
        </div>
    </React.Fragment>
  )
}

export default Layout