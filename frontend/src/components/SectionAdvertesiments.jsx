import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { IoAddCircle, IoTrash } from "react-icons/io5";
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
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

  return (
    <div className="advertisements-container">
      <div className="header-section">
        <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Avisos</h1>
        <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Lista de Avisos</h2>
        {user && user.role === 'admin' && (
          <div className="mb-3">
            <Link to="/advertisements/admin" className="btn btn-add-advertisement">Añadir Aviso <IoAddCircle /></Link>
          </div>
        )}
      </div>

      <div className="advertisements-list">
        {sectionAdvertesiments.map((section, index) => (
          <div className="advertisement-card" key={section.uuid}>
            <img src={section.url} alt="Aviso" className="advertisement-image" />
            <div className="advertisement-details">
              <h3 className="advertisement-title">{section.name}</h3>
              <p className="advertisement-description">{section.description}</p>
              {user && user.role === 'admin' && (
                <div className="advertisement-actions">
                  <Link to={`/advertisements/admin/edit/${section.uuid}`} className="btn btn-edit-advertisement me-2">Editar Aviso {index+1}</Link>
                  <button onClick={() => handleDeleteSectionAdvertesiments(section.uuid, section.name)} className="btn btn-delete-advertisement">Eliminar</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {message && <div className="alert alert-success mt-3">{message}</div>}

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
  )
}

export default SectionAdvertesiments;