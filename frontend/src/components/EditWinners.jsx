import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/FormEditRegister.css";
import { Link } from "react-router-dom";
import { IoCheckmarkCircle, IoArrowBack } from "react-icons/io5";

const EditWinners = () => {
  const [nameCompetition, setNameCompetition] = useState("");
  const [rider, setRider] = useState("");
  const [teamName, setTeamName] = useState("");
  const [nationality, setNationality] = useState("");
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getWinnerById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/result/${id}`);
        setNameCompetition(response.data.nameCompetition);
        setRider(response.data.rider);
        setTeamName(response.data.teamName);
        setNationality(response.data.nationality);
        setCategory(response.data.category);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getWinnerById();
  }, [id]);

  const updateWinner = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm('¿Está seguro de que desea aplicar los cambios?');
    if (confirmUpdate) {
      try {
        await axios.patch(`http://localhost:5000/result/${id}`, {
          nameCompetition,
          rider,
          teamName,
          nationality,
          category,          
        });
        navigate('/result/winners');
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="form-check-container">
      <div className="form-edit-container">
        <div className="result-edit-container">
          <h1 className="title" style={{ color: "#E3B04B" }}>
            Editar Ganador '{rider}'.
          </h1>
          <h2 className="subtitle mt-2" style={{ color: "#ffffff" }}>
            ¡Edita a los ganadores del Reto Puma, {user && user.name}!
          </h2>
          <div className="card bg-dark text-white">
            <div className="card-body">
              <form onSubmit={updateWinner}>
                <p className="text-center">{msg}</p>
                <div className="mb-3">
                  <label className="form-label">Nombre de la Competición:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nameCompetition}
                    onChange={(e) => setNameCompetition(e.target.value)}
                    placeholder="Competencia"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre del Rider:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={rider}
                    onChange={(e) => setRider(e.target.value)}
                    placeholder="Rider"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre del Equipo:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Equipo"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Procedencia:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder="Lugar de Origen"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoría:</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}                   
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
                  <button type="submit" className="btn btn-success mt-2">
                    Guardar Cambios <IoCheckmarkCircle />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWinners;