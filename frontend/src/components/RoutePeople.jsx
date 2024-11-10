import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { IoAddCircle, IoHome, IoCart, IoEye } from "react-icons/io5";
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"; 

const RoutePeople = () => {
  const [routePeople, setRoutePeople] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRoutePeople();
  }, []);

  const fetchRoutePeople = async () => {
    const response = await axios.get("http://localhost:5000/routes");
    setRoutePeople(response.data);
  };

    const handleDeleteRoute = async (uuid, name) => {
        const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar la ruta ${name}?`);
        if (confirmDelete) {
        try {
            await axios.delete(`http://localhost:5000/routes/${uuid}`);
            setMessage('Ruta eliminada exitosamente.');
            setRoutePeople(routePeople.filter(route => route.uuid !== uuid));
            setTimeout(() => setMessage(''), 2500);
        } catch (error) {
            setMessage('No se pudo eliminar la ruta.');
            setTimeout(() => setMessage(''), 3000);
        }
        }
    };  

  return (
    <div className="product-list-container">
      <div>
        <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Rutas</h1>
        <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Ruta de la competencia</h2>      

        {user && user.role === 'admin' && (
          <>
            <Link to="/ruta/admin" className="btn btn-add-product">Añadir Ruta <IoAddCircle /></Link>
          </>
        )}
        
        <div className="row">
          {routePeople.map((route) => (
            <div className="col-md-3 mb-4" key={route.id}>
              <div className="card h-22">
                <img src={route.url} alt="Image" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{route.name}</h5>
                  <p className="card-text">{route.description}</p>
                </div>
                {user && user.role === 'admin' && (
                  <div className="card-footer d-flex justify-content-between">
                    <Link to={`/products/edit/${route.uuid}`} className="btn btn-edit-product me-2">Editar</Link>
                    <button onClick={() => handleDeleteRoute(route.uuid, route.name)} className="btn btn-delete-product ms-0">Eliminar</button>
                  </div>
                )}
                {user && user.role === 'admin' && (
                  <div className="card-footer">
                    <Link to={`/products/buy/${route.uuid}`} className="btn-buy-product w-100">
                      Detalles Producto <IoCart />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>

      {/* Contenedor de información adicional */}
      <div className="info-adicional p-3 mb-3 mt-5" style={{ backgroundColor: '#transparent', borderRadius: '8px' }}>
      <p className="footer-socials" style={{ fontSize: '30px', fontWeight: 'bold', color: '#e3b04b' }}>RETO PUMA</p>
        <nav className="footer-nav">
          <Link to= "/dashboard">
            <a href="#inicio">INICIO</a>
          </Link>
          <Link to= "/ruta">
              <a>RUTA</a>
          </Link>
          <Link to= "/forms/register">
             <a>"INSCRIPCIONES"</a>
          </Link>
          <Link to= "/result/winners">
              <a>RESULTADOS</a>
          </Link>
          <Link to= "/products">
             <a>PRODUCTOS</a>
          </Link>
        </nav>       
        <div className="footer-socials">
          <h3>Síguenos en nuestras redes sociales:</h3>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/reto_puma_bike_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/people/RETO-PUMA-BIKE/100092370199634/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.youtube.com/channel/UC1tYk7-w0jBQEBBwSrpl2Ow"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
        <p className="footer-contact">
          Contacto:{' '}
          <a href="mailto:latasgordobiketapia@gmail.com">
            latasgordobiketapia@gmail.com
          </a>
        </p>
        <p className="footer-address">
          Dirección:{' '}
          <a href="https://maps.app.goo.gl/QXDN6FzP7AgYHR7q6">
            Libertad 1, Aviación, 42506 Actopan, Hgo.
          </a>
        </p>
        <p className="footer-copyright">
          © 2024 Reto Puma Bike. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}

export default RoutePeople