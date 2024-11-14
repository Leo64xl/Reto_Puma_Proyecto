import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { IoAddCircle, IoTrash } from "react-icons/io5";
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/SectionAdvertesiments.css";

const SectionAdvertesiments = () => {
  const [sectionAdvertesiments, setSectionAdvertesiments] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSectionAdvertesiments();
  }, []);

  const fetchSectionAdvertesiments = async () => {
    const response = await axios.get("http://localhost:5000/advertisements");
    setSectionAdvertesiments(response.data);
  };

  const handleDeleteSectionAdvertesiments = async (uuid, name) => {
    const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar el Aviso ${name}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/advertisements/${uuid}`);
        setMessage('Aviso eliminado exitosamente.');
        setSectionAdvertesiments(sectionAdvertesiments.filter(section => section.uuid !== uuid));
        setTimeout(() => setMessage(''), 2500);
      } catch (error) {
        setMessage('No se pudo eliminar el aviso.');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
        },
      },
    ],
  };

  return (
    <div className='avisos-fondo'>
      <div className="avisos-container">
        <h1 className="avisos-title">Avisos Puma</h1>
        <h3 className="avisos-subtitle">Seccion de Avisos Puma</h3>
        {user && user.role === 'admin' && (
          <div className="mb-3">
            <Link to="/advertisements/admin" className="btn btn-add-advertisement">Añadir Aviso <IoAddCircle /></Link>
          </div>
        )}
        <Slider {...settings}>
          {sectionAdvertesiments.map((section, index) => (
            <div key={index} className="carousel-item">
              <img className="carousel-image" src={section.url} alt={section.name} />
              <div className="carousel-caption">
                <h3>{section.name}</h3>
                <p>{section.description}</p>
                {user && user.role === 'user' && (
                  <Link to={`/advertisements/view/${section.uuid}`} className="btn btn-edit-advertisement me-2">Ver Aviso {index+1}</Link>
                )}
                {user && user.role === 'admin' && (
                  <div className="advertisement-actions">
                    <Link to={`/advertisements/admin/edit/${section.uuid}`} className="btn btn-edit-advertisement me-2">Editar Aviso {index+1}</Link>
                    <button onClick={() => handleDeleteSectionAdvertesiments(section.uuid, section.name)} className="btn btn-delete-advertisement">Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>
        {/* Contenedor de información adicional */}
        <div className="info-adicional p-3 mb-3 mt-5" style={{ backgroundColor: 'transparent', borderRadius: '8px' }}>
          <p className="footer-socials" style={{ fontSize: '30px', fontWeight: 'bold', color: '#e3b04b' }}>RETO PUMA</p>
          <nav className="footer-nav">
            <Link to="/dashboard">INICIO</Link>
            <Link to="/ruta">RUTA</Link>
            <Link to="/forms/register">INSCRIPCIONES</Link>
            <Link to="/result/winners">RESULTADOS</Link>
            <Link to="/products">PRODUCTOS</Link>
          </nav>
          <div className="footer-socials">
            <h3>Síguenos en nuestras redes sociales:</h3>
            <div className="social-icons">
              <a href="https://www.instagram.com/reto_puma_bike_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.facebook.com/people/RETO-PUMA-BIKE/100092370199634/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://www.youtube.com/channel/UC1tYk7-w0jBQEBBwSrpl2Ow" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>
          <p className="footer-contact">Contacto: <a href="mailto:latasgordobiketapia@gmail.com">latasgordobiketapia@gmail.com</a></p>
          <p className="footer-address">Dirección: <a href="https://maps.app.goo.gl/QXDN6FzP7AgYHR7q6">Libertad 1, Aviación, 42506 Actopan, Hgo.</a></p>
          <p className="footer-copyright">© 2024 Reto Puma Bike. Todos los derechos reservados.</p>
        </div>
    </div>
  );
};

export default SectionAdvertesiments;