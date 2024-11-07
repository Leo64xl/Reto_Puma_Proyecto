import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import logo1 from '../logo1.png';
import "../styles/NavbarHome.css"; 
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";
//import axios from 'axios';

const NavbarHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    
    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };
    
    if (!user) {
        return <div>Loading...</div>; 
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <NavLink to="/products" className="navbar-brand">
                        <img src={logo1} className="logo" alt="logo" />
                    </NavLink>
                    {user && (
                        <h2 className="welcome-text ms-0">
                            ¡Bienvenido de nuevo! {user.name} {user.role === "user" ? ":D" : " Admin🔥"}
                        </h2>
                    )}
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">      
                        {user.role === 'user' && (
                            <>
                                <Link to="/products" className="btn btn-outline-light me-3">
                                    ¡Visita nuestro catalogo de Productos!
                                </Link>
                                <p className="text-white mt-2 me-3">o bien</p>
                                <Link to="/forms/register" className="btn btn-outline-light me-2">
                                    Inicia un registro aquí
                                </Link>
                            </>
                        )}
                        {user.role === 'admin' && (
                            <>
                                <Link to="/users" className="btn btn-outline-light me-3">
                                    Administrar Perfiles
                                </Link>
                                <Link to="/forms/view/admin" className="btn btn-outline-light me-3">
                                    Ver Registros
                                </Link>
                                <Link to="/forms/view/admin/graphics" className="btn btn-outline-light me-3">
                                    Trafico de Datos
                                </Link>
                                <Link to="/products/add" className="btn btn-outline-light me-2">
                                    Añadir Nuevos Productos
                                </Link>
                            </>
                        )}
                        {user && (
                            <li className="nav-item">
                                <button onClick={logout} className="btn btn-outline-light me-2">
                                    Cerrar Sesión
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarHome;
