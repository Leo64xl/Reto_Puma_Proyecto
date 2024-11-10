import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPricetag, IoHome, IoLogOut, IoCreate, IoArchive, IoAnalytics, IoDocumentText, IoPeople, IoClipboard, IoPodium } from "react-icons/io5";
import "../styles/Sidebar.css";
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";
import axios from 'axios';

const Sidebar = ({ isSidebarOpen }) => {
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
    <aside className={`menuPrincipal ${isSidebarOpen ? "open" : ""}`}>
      <div className="generalC">
        <p className="menu-label">General</p>
      </div>
      <ul className="menu-list">
        <li>
          <div className="dashboardC">
            <NavLink to={"/dashboard"} className="nav-link">
              <IoHome /> Inicio
            </NavLink>
          </div>
        </li>
        <li>
          <div className="productsC">
            <NavLink to={"/products"} className="nav-link">
              <IoPricetag /> Productos
            </NavLink>
          </div>
        </li>
        {user && user.role === 'user' && (
          <li>
            <div className="FormsC">
              {userForms.length > 0 ? (
                <NavLink to={"/forms/register"} className="nav-link">
                  <IoDocumentText /> Mi Inscripción
                </NavLink>
              ) : (
                <NavLink to={"/forms/register"} className="nav-link">
                  <IoCreate /> Inscribirme
                </NavLink>
              )}
            </div>
          </li>
        )}
        <li>
          <div className="dashboardC">
            <NavLink to={"/result/winners"} className="nav-link">
              <IoPodium /> Resultados
            </NavLink>
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
                <NavLink to={"/users"} className="nav-link">
                  <IoPeople /> Perfiles
                </NavLink>
              </div>
            </li>
          </ul>

          <ul className="menu-list">
            <li>
              <div className="FormsC">
                <NavLink to={"/forms/view/admin"} className="nav-link">
                  <IoClipboard /> Inscripciones
                </NavLink>
              </div>
            </li>
          </ul>

          <ul className="menu-list">
            <li>
              <div className="FormsC">
                <NavLink to={"/forms/view/admin/graphics"} className="nav-link">
                  <IoAnalytics /> Estadisticas
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      )}

      <div className="settingsC">
        <p className="menu-label">Ajustes</p>
      </div>
      <ul className="buttonMenu">
        <li>
          <button onClick={logout} className="buttonM">
            <IoLogOut /> Cerrar Sesión
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;