import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import logo1 from '../logo1.png';
import "../styles/Navbar.css"; 
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";
import { IoHome } from 'react-icons/io5';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <NavLink to="/" className="navbar-brand">
            <img src={logo1} className="logo" alt="logo" />
          </NavLink>
          {user && (
            <h2 className="welcome-text ms-0">
              ¡Bienvenido de nuevo! {user && user.name} {user && user.role === "user" && ":D"} {user && user.role === "admin" && " Admin🔥"}
            </h2>
          )}
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
          <Link to={"/dashboard"} className="btn btn-outline-light me-2">
            <IoHome/>
          </Link>
            {user && (
              <li className="nav-item">
                <button onClick={logout} className="btn btn-outline-light">
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

export default Navbar;