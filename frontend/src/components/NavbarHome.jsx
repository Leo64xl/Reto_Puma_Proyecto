import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import "../styles/NavbarHome.css";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const NavbarHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  // Hook para detectar el desplazamiento de la página
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Se vuelve sólido
      } else {
        setIsScrolled(false); // Se vuelve transparente
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Limpiar el evento al desmontar el componente
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="boxC bg-dark">
      <nav
        className={`rectangle ${isScrolled ? "solid" : "transparent"}`}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <NavLink to="/products" className="navbar-brand">
              <div className="logoPosition">
                <img src={logo1} alt="logo" />
              </div>
            </NavLink>
            {user && (
              <h2 className="welcome-text ms-0">
                ¡Bienvenido de nuevo! {user && user.name}{" "}
                {user && user.role === "user" && ":D"}{" "}
                {user && user.role === "admin" && " Admin🔥"}
              </h2>
            )}
          </div>

          {user && user.role === "admin" && location.pathname != "/products" && (
            <>
              {
               console.log("Hola"+location.pathname) 
                /* Botones principales de la navbar */}
              <div className={`divsButtons ${isMenuOpen ? "is-active" : ""}`}>
                 <Link to="/users">
                       <div className="div">PERFILES</div>
                 </Link>

                 <Link to="/forms/register">
                       <div className="text-wrapper-2">REGISTROS</div>
                 </Link>

                 <Link to="/forms/view/admin/graphics">
                      <div className="text-wrapper-3">ESTADISTICAS</div>
                 </Link>

                 <Link to="/products/add">
                        <div className="text-wrapper-4">AÑADIR PRODUCTOS</div>
                 </Link>
              </div>
              {/* Botón de Logout */}
              <div className="bigButtons">
                <button onClick={logout} className="btn btn-outline-light me-2">
                  Cerrar Sesión
                </button>
              </div>
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
              {/* Menú desplegable para pantallas móviles */}
              {isMenuOpen && (
                <div className="divsButtons-mobile">
                <Link to="/users">
                       <div className="div">PERFILES</div>
                 </Link>

                 <Link to="/forms/register">
                       <div className="text-wrapper-2">REGISTROS</div>
                 </Link>

                 <Link to="/forms/view/admin/graphics">
                      <div className="text-wrapper-3">ESTADISTICAS</div>
                 </Link>

                 <Link to="/products/add">
                        <div className="text-wrapper-4">PRODUCTOS</div>
                 </Link>
                </div>
              )}
            </>
          )}

          {user && user.role === "user" && (
            <>
              {/* Botones principales de la navbar */}
              <div className={`divsButtons ${isMenuOpen ? "is-active" : ""}`}>
                  <Link to="/forms/register">
                     <div className="div">¡INSCRIBETE AHORA!</div>
                 </Link> 

                 <Link to="/products">
                      <div className="text-wrapper-2">VISITA NUESTRO CATALOGO</div>
                </Link>

                <Link to="/products">
                     <div className="text-wrapper-3">AVISOS Y RUTAS</div>
                </Link>
              </div>

              {/* Botón de Logout */}
              <div className="bigButtons">
                <button onClick={logout} className="btn btn-outline-light me-2">
                  Logout
                </button>
              </div>
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
              {/* Menú desplegable para pantallas móviles */}
              {isMenuOpen && (
                <div className="divsButtons-mobile">
                  <Link to="/forms/register">
                      <div className="div">INSCRIBIRME</div>
                  </Link>

                  <Link to="/products">
                      <div className="text-wrapper-2">CATALOGO</div>
                  </Link>

                  <Link to="/products">
                      <div className="text-wrapper-3">AVISOS</div>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarHome;