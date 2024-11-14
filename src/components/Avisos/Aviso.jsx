import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { IoAddCircle, IoTrash } from "react-icons/io5";
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Aviso.css';

const Aviso = () => {
  const [avisos, setAvisos] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAvisos();
  }, []);

  const fetchAvisos = async () => {
    const response = await axios.get("http://localhost:5000/advertisements");
    setAvisos(response.data);
  };

  const handleDeleteAviso = async (uuid, name) => {
    const confirmDelete = window.confirm(`¿Está seguro de que desea eliminar el Aviso ${name}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/advertisements/${uuid}`);
        setMessage('Aviso eliminado exitosamente.');
        setAvisos(avisos.filter(aviso => aviso.uuid !== uuid));
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
    <div className="avisos-container">
      <h2 className="avisos-title">Avisos Puma</h2>
      <h3 className="avisos-subtitle">Seccion de Avisos Puma</h3>
      {user && user.role === 'admin' && (
        <div className="mb-3">
          <Link to="/advertisements/admin" className="btn btn-add-advertisement">Añadir Aviso <IoAddCircle /></Link>
        </div>
      )}
      <Slider {...settings}>
        {avisos.map((aviso, index) => (
          <div key={index} className="carousel-item">
            <img className="carousel-image" src={aviso.url} alt={aviso.name} />
            <div className="carousel-caption">
              <h3>{aviso.name}</h3>
              <p>{aviso.description}</p>
              {user && user.role === 'user' && (
                  <Link to={`/advertisements/view/${aviso.uuid}`} className="btn btn-edit-advertisement me-2">Ver Aviso {index+1}</Link>
              )}
              {user && user.role === 'admin' && (
                <div className="advertisement-actions">
                  <Link to={`/advertisements/admin/edit/${aviso.uuid}`} className="btn btn-edit-advertisement me-2">Editar Aviso {index+1}</Link>
                  <button onClick={() => handleDeleteAviso(aviso.uuid, aviso.name)} className="btn btn-delete-advertisement">Eliminar</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
      {message && <div className="alert alert-success mt-3">{message}</div>}
    </div>
  );
};

export default Aviso;