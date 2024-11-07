import React, {useState, useEffect} from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom';
import logo1 from '../logo1.png';
import "../styles/NavbarHome.css"; 
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, reset } from "../features/authSlice";
import axios from 'axios';

const NavbarHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [userForms, setUserForms] = useState([]);
    
    useEffect(() => {
        getForms();
    }, [user]);

    const getForms = async () => {
        try {
          const response = await axios.get("http://localhost:5000/forms");
          if (user && user.role === 'user') {
            const userForms = response.data.filter(form => form.userId === user.id);
            setUserForms(userForms);
          }
        } catch (error) {
          console.error("Failed to fetch forms:", error);
        }
      };
  
    const logout = () => {
      dispatch(LogOut());
      dispatch(reset());
      navigate("/");
    };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <NavLink to="/products" className="navbar-brand">
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

        {user && user.role === 'user' && userForms.length > 0 && (
              <>
                <Link to="/products" className="btn btn-outline-light me-3">
                  ¡Visita nuestro catalogo de Productos!
                </Link>
                <Link to={`/forms/register/edit/${userForms[0].uuid}`} className="btn btn-outline-light me-3">
                  ¡Edita tu registro!
                </Link>
                <p className="text-white mt-2 me-3">o si no</p>
                <Link to="/forms/register" className="btn btn-outline-light me-2">
                  Inicia un registro aquí
                </Link>
            </>
        )}


        {user && user.role === 'admin' && (
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

  )
}

export default NavbarHome