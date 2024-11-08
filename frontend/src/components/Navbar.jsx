import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link, useLocation, useParams } from "react-router-dom";
import logo1 from "../logo1.png";
import "../styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { IoHome } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const restrictedAdminRoutes = [
    "/products", "/products/add", "/forms/register", 
    `/forms/register/edit/${id}`, "/users", "/users/add", 
    "/forms/view/admin", "/forms/view/admin/graphics", 
    `/forms/view/admin/form/${id}`, `/users/edit/${id}`
  ];

  const restrictedUserRoutes = [
    "/products", "/forms/register", "/forms/register/add", 
    `/products/buy/${id}`, `/forms/register/edit/${id}`
  ];

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderAdminMenu = () => (
    <div className={`menu ${isMenuOpen ? "is-active" : ""}`}>
      <Link to="/users">PERFILES</Link>
      <Link to="/forms/register">REGISTROS</Link>
      <Link to="/forms/view/admin/graphics">ESTADISTICAS</Link>
      <Link to="/products/add">AÑADIR PRODUCTOS</Link>
    </div>
  );

  const renderUserMenu = () => (
    <div className={`menu ${isMenuOpen ? "is-active" : ""}`}>
      <Link to="/forms/register">¡INSCRIBETE AHORA!</Link>
      <Link to="/products">VISITA NUESTRO CATALOGO</Link>
      <Link to="/products">AVISOS Y RUTAS</Link>
    </div>
  );

  if (!user) return <div>Loading...</div>;

  return (
    <div className="navbar-container">
      <nav className={`navbar ${isScrolled ? "solid" : "transparent"}`}>
        <div className="container-fluid">
          <div className="logo-container">
            <NavLink to="/products" className="navbar-brand">
              <img src={logo1} alt="logo" className="logo" />
            </NavLink>

            <h2 className="welcome-text">
              ¡Bienvenido de nuevo, {user && user.name}{" "}
                {user && user.role === "user" && ":D !"}{" "}
                {user && user.role === "admin" && " Admin🔥!"}
            </h2>
          </div>

          {/* Menú para pantallas grandes */}
          {!isMenuOpen && (
            <>
              {user && user.role === "admin" && !restrictedAdminRoutes.includes(location.pathname) && renderAdminMenu()}
              {user && user.role === "user" && !restrictedUserRoutes.includes(location.pathname) && renderUserMenu()}
            </>
          )}

          <div className="actions">
            {user && location.pathname != "/dashboard" && (
               <Link to="/dashboard" className="btn btn-outline-light me-1"><IoHome /></Link>
            )}
            <button onClick={logout} className="btn btn-outline-light me-1">Cerrar Sesión</button>

            {/* Menú hamburguesa para móviles */}
            <button
              className="navbar-burger"
              aria-label="menu"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>

          {/* Menú desplegable para pantallas móviles */}
          {isMenuOpen && (
            <div className="divsButtons-mobile">
              <Link to="/forms/register">
                <div className="div">INSCRIPCION</div>
              </Link>
              <Link to="/products">
                <div className="text-wrapper-2">CATALOGO</div>
              </Link>
              <Link to="/products">
                <div className="text-wrapper-3">AVISOS Y RUTAS</div>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
