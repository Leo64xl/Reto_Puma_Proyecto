import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import '../styles/Navbar.css'

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar/>
        <div className='section1'></div>
        <div className="columns" style={{minHeight: "90vh", backgroundColor: '#0A0A0A'}} > 
            <div className="column is-2" style={{backgroundColor: '#0A0A0A'}}>
            <Sidebar/>
            </div>
            <div className="column" style={{ backgroundColor: '#0A0A0A', opacity: 0.9 }}>
                <main>{children}</main>
            </div>               
        </div>
    </React.Fragment>
  )
}

export default Layout