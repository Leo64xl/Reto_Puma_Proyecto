import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut  } from "react-icons/io5";
import "../styles/Sidebar.css";
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {

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
      <aside className="menuPrincipal">
          <div className="generalC">
             <p className="menu-label">General</p>
           </div>
        <ul className="menu-list">
          <li>
            <div className="dashboardC">
               <NavLink to={"/dashboard"} className="has-text-dark">
               <IoHome/> Dashboard</NavLink> 
            </div>
          </li>
          <li>
            <div className="productsC">
              <NavLink to={"/products"} className="productsM has-text-dark">
              <IoPricetag/> Products</NavLink>
            </div>
          </li>
        </ul>
        
        {user && user.role === 'admin' && (
          <div>
              <div className="adminC">
              <p className="menu-label">Admin</p>
              </div>
            <ul className="menu-list">
              <li>
                <div className="usersC">
                  <NavLink to={"/users"} className="usersM has-text-dark">
                  <IoPerson/> Users</NavLink>
                </div>
              </li>         
            </ul>
          </div>
        )}

         <div className="settingsC">
            <p className="menu-label">Settings</p>
         </div>
        <ul className="buttonMenu">
          <li>
             <button 
              onClick={logout}
              className="buttonM">
               <IoLogOut/> 
               Logout
             </button>             
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
