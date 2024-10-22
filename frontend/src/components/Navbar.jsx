import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import logo2 from '../logo2.png';
import "../styles/Navbar.css"; 
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <nav 
        className="navbar2" 
        role="navigation" 
        arial-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-item">
            <div className='logoPosition'>
              <img src={logo2} width="112" height="28" alt="logo" />
            </div>
          </NavLink>

          <div className='buttonLog'>           
            <button 
              onClick={logout}
              className="buttonDisegn">
                Logout
              </button>
          </div>

          <a 
           href='!#' 
           role="button" 
           className="navbar-burger" 
           aria-label="menu" 
           aria-expanded="false" 
           data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">  
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar