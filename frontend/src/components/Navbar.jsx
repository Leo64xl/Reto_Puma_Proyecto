import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate, Link, useLocation, useParams} from "react-router-dom";
import logo1 from "../logo1.png";
import "../styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { IoHome, IoMenu, IoPeople, IoPerson } from "react-icons/io5";
import Sidebar from "../components/Sidebar";

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const restrictedRoutes = useMemo(() => ({
    admin: [
      "/products", "/products/add", "/forms/register",
      `/forms/register/edit/${id}`, "/users", "/users/add",
      "/forms/view/admin", "/forms/view/admin/graphics",
      `/forms/view/admin/form/${id}`, `/users/edit/${id}`,
      "/result/winners", "/result/winners/add", 
      `/result/winners/edit/${id}`, "/ruta", "/ruta/admin",
      `/ruta/admin/edit/${id}`, "/advertisements", "/advertisements/admin",
      `/advertisements/admin/edit/${id}`
    ],
    user: [
      "/products", "/forms/register", "/forms/register/add",
      `/products/buy/${id}`, `/forms/register/edit/${id}`,
      "/advertisements", "/ruta"
    ]
  }), [id]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderMenu = () => {
    if (user?.role === "admin" && !restrictedRoutes.admin.includes(location.pathname)) {
      return (
        <div className={`menu ${isMenuOpen ? "is-active" : ""}`}>
          <Link to="/users">PERFILES</Link>
          <Link to="/forms/register">REGISTROS</Link>
          <Link to="/forms/view/admin/graphics">ESTADISTICAS</Link>
          <Link to="/products/add">AÑADIR PRODUCTOS</Link>
        </div>
      );
    }
    if (user?.role === "user" && !restrictedRoutes.user.includes(location.pathname)) {
      return (
        <div className={`menu ${isMenuOpen ? "is-active" : ""}`}>
          <Link to="/forms/register">¡INSCRIBETE AHORA!</Link>
          <Link to="/products">VISITA NUESTRO CATALOGO</Link>
          <Link to="/ruta">RUTAS</Link>
          <Link to="/advertisements">AVISOS</Link>
        </div>
      );
    }
    return null;
  };

  if (!user) return <div className="loadingMsg">Cargando</div>;

  return (
    <div className="navbar-container">
      <nav className={`navbar ${isScrolled ? "solid" : "transparent"}`}>
        <div className="container-fluid">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <IoMenu />
          </button>
          <div className="logo-container">
            <div className="navbar-brand">
            <Link to= "/">
              <img src={logo1} alt="logo" className="logo" />
              </Link>
            </div>

            <h2 className="welcome-text">
              ¡Bienvenido de nuevo {user && user.name}{" "}
              {user && user.role === "user" && "! :D"}{" "}
              {user && user.role === "admin" && "! Admin🔥"}
            </h2>
          </div>

          {/* Menú para pantallas grandes */}
          {!isMenuOpen && renderMenu()}

          <div className="actions">
            {/*{user && location.pathname !== "/dashboard" && (
              
              <Link to="/my/account/id:" className="btn btn-outline-light me-1">
                <IoPerson />
              </Link>

            )}*/}

            {user && location.pathname !== "/dashboard" && (
              
              <Link to="/dashboard" className="btn btn-outline-light me-1">
                <IoHome />
              </Link>

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
              <Link to="/forms/register"><div className="div">INSCRIPCION</div></Link>
              <Link to="/products"><div className="text-wrapper-2">CATALOGO</div></Link>
              <Link to="/rutas"><div className="text-wrapper-3">RUTAS</div></Link>
              <Link to="/advertisements"><div className="text-wrapper-3">AVISOS</div></Link>
            </div>
          )}
        </div>
      </nav>
      {user && location.pathname != "/dashboard" && (
        <>
          <Sidebar isSidebarOpen={isSidebarOpen} />  
        </>
      )}
    </div>
  );
};

export default Navbar;