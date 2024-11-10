import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/FormCheck.css';
import { useSelector } from "react-redux";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoTrophy, IoPerson, IoPeople, IoFlag, IoList, IoCheckmarkCircle, IoArrowBack } from "react-icons/io5";

const Result = () => {
  const [nameCompetition, setNameCompetition] = useState("");
  const [rider, setRider] = useState("");
  const [teamName, setTeamName] = useState("");
  const [nationality, setNationality] = useState("");
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveWinner = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/result", {
        nameCompetition,
        rider,
        teamName,
        nationality,
        category,
      });
      navigate("/result/winners");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="form-check-container">
    <div className="result-container">
      <h1 className="title" style={{ color: '#E3B04B' }}>Registrar Ganador</h1>
      <h2 className="subtitle mt-2" style={{ color: '#ffffff' }}>¡Registra a los ganadores del Reto Puma, {user && user.name}! </h2>
      <div className="card bg-dark text-white">
        <div className="card-body">
          <form onSubmit={saveWinner}>
            <p className="text-center">{msg}</p>
            <div className="mb-3">
              <label className="form-label"><IoTrophy /> Nombre de la Competicion:</label>
              <input
                type='text'
                className="form-control"
                value={nameCompetition}
                onChange={(e) => setNameCompetition(e.target.value)}
                placeholder='Competencia'
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPerson /> Nombre del Rider:</label>
              <input
                type='text'
                className="form-control"
                value={rider}
                onChange={(e) => setRider(e.target.value)}
                placeholder='Rider'
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPeople /> Nombre del Equipo:</label>
              <input
                type='text'
                className="form-control"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder='Nombre del Equipo'
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoFlag /> Procedencia:</label>
              <input
                type='text'
                className="form-control"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder='Lugar de Origen'
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoList /> Categoría:</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option>Selecciona una Categoría</option>
                <option value='Infantil Pañales Femenil'>Infantil Pañales Femenil</option>
                <option value='Infantil Pañales Varonil'>Infantil Pañales Varonil</option>
                <option value='Infantil AA Femenil'>Infantil AA Femenil</option>
                <option value='Infantil AA Varonil'>Infantil AA Varonil</option>
                <option value='Infantil C Varonil'>Infantil C Varonil</option>
                <option value='Infantil C Femenil'>Infantil C Femenil</option>
                <option value='Infantil B Varonil'>Infantil B Varonil</option>
                <option value='Infantil B Femenil'>Infantil B Femenil</option>
                <option value='Infantil A Varonil'>Infantil A Varonil</option>
                <option value='Infantil A Femenil'>Infantil A Femenil</option>
                <option value='Elite Varonil'>Elite Varonil</option>
                <option value='Elite Femenil'>Elite Femenil</option>
                <option value='Varonil Avanzados'>Varonil Avanzados</option>
                <option value='Master 30 Varonil'>Master 30 Varonil</option>
                <option value='Master 40 Varonil'>Master 40 Varonil</option>
                <option value='Juvenil Varonil'>Juvenil Varonil</option>
                <option value='Master 50'>Master 50</option>
                <option value='Princiapaintes Libre Varonil'>Princiapaintes Libre Varonil</option>
                <option value='Femenil Princiapaintes'>Femenil Princiapaintes</option>
                <option value='Femenil 30'>Femenil 30</option>
                <option value='Femenil 40'>Femenil 40</option>
                <option value='Mamuts Varonil'>Mamut's Varonil</option>
                <option value='Master 60 Varonil'>Master 60 Varonil</option>
                <option value='Femenil 50'>Femenil 50</option>
                <option value='Gravel Varonil'>Gravel Varonil</option>
                <option value='Gravel Femenil'>Gravel Femenil</option>
                <option value='Rodadores Femenil'>Rodadores Femenil</option>
                <option value='Rodadores Varonil'>Rodadores Varonil</option>
                <option value='E-BIKE Mutuo'>E-BIKE Mutuo</option>
              </select>
            </div>
            <div className="d-flex justify-content-between">
                <button type='submit' className='btn btn-success mt-2'>Registrar Ganador <IoCheckmarkCircle /></button>
            </div>
          </form>
        </div>
      </div>
      {/* Contenedor de información adicional */}
      <div className="info-adicional p-3 mb-3" style={{ backgroundColor: 'transparent', borderRadius: '8px' }}>
        <p className="footer-socials" style={{ fontSize: '30px', fontWeight: 'bold', color: '#e3b04b' }}>RETO PUMA</p>
        <nav className="footer-nav">
          <Link to="/dashboard">
            <a href="#inicio">INICIO</a>
          </Link>
          <Link to="/ruta">
            <a>RUTA</a>
          </Link>
          <Link to="/forms/register">
            <a>"INSCRIPCIONES"</a>
          </Link>
          <Link to="/result/winners">
            <a>RESULTADOS</a>
          </Link>
          <Link to="/products">
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
    </div>
  );
};

export default Result;