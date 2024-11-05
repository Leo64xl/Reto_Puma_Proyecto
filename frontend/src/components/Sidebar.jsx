import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPricetag, IoHome, IoLogOut, IoPersonAdd, IoArchive, IoConstruct, IoAnalytics, IoDocumentText } from "react-icons/io5";
import "../styles/Sidebar.css";
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";
import axios from 'axios';

const Sidebar = ({ onFormUpdate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [userForms, setUserForms] = useState([]);

  useEffect(() => {
    if (user && user.role === 'user') {
      getUserForms();
    }
  }, [user]);

  const getUserForms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/forms");
      const userForms = response.data.filter(form => form.userId === user.id);
      setUserForms(userForms);
    } catch (error) {
      console.error("Failed to fetch user forms:", error);
    }
  };
 
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div style={{backgroundColor: '#0A0A0A'}}>
      <aside className="menuPrincipal" style={{backgroundColor: '#0A0A0A'}}>
        <div className="generalC">
          <p className="menu-label">General</p>
        </div>
        <ul className="menu-list">
          <li>
            <div className="dashboardC">
              <NavLink to={"/dashboard"} style={{color: '#ffffffde'}}>
                <IoHome /> Dashboard
              </NavLink>
            </div>
          </li>
          <li>
            <div className="productsC">
              <NavLink to={"/products"} className="productsM" style={{color: '#ffffffde'}}>
                <IoPricetag /> Products
              </NavLink>
            </div>
          </li>
          <li>
            <div className="FormsC">
              {user && user.role === 'user' && userForms.length > 0 ? (
                <NavLink to={"/forms/register"} className="productsM" style={{color: '#ffffffde'}}>
                  <IoDocumentText /> My Register
                </NavLink>
              ) : (
                <NavLink to={"/forms/register"} className="productsM" style={{color: '#ffffffde'}}>
                  <IoPersonAdd /> Regist Now
                </NavLink>
              )}
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
                  <NavLink to={"/users"} className="usersM" style={{color: '#ffffffde'}}>
                    <IoConstruct /> Control Users
                  </NavLink>
                </div>
              </li>
            </ul>

            <ul className="menu-list">
              <li>
                <div className="FormsC">
                  <NavLink to={"/forms/view/admin"} className="usersM" style={{color: '#ffffffde'}}>
                    <IoArchive /> View Registers
                  </NavLink>
                </div>
              </li>
            </ul>

            <ul className="menu-list">
              <li>
                <div className="FormsC">
                  <NavLink to={"/forms/view/admin/graphics"} className="usersM" style={{color: '#ffffffde'}}>
                    <IoAnalytics /> Analytics Users
                  </NavLink>
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
            <button onClick={logout} className="buttonM">
              <IoLogOut />
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;