import React, { useState, useEffect } from 'react';
import "../styles/Winners.css";
import { Link } from "react-router-dom";
import { IoTrash, IoPersonAddSharp, IoTrophy, IoTrophyOutline, IoPerson, IoPeople, IoFlag, IoList, IoPodium, IoPencil } from "react-icons/io5";
import axios from "axios";
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const Winners = () => {
    const [winners, setWinners] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchWinners();
    }, []);

    const fetchWinners = async () => {
        try {
            const response = await axios.get("http://localhost:5000/result");
            console.log(response.data); // Verifica los datos obtenidos
            setWinners(response.data);
        } catch (error) {
            console.error("Error al obtener los ganadores:", error);
        }
    };

    const handleDelete = async (uuid, rider) => {
        const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar al ganador: ${rider}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/result/${uuid}`);
                setMsg('Ganador eliminado exitosamente');
                setWinners(winners.filter(winner => winner.uuid !== uuid));
                setTimeout(() => setMsg(''), 2500);
            } catch (error) {
                setMsg('No se pudo eliminar al usuario.');
                setTimeout(() => setMsg(''), 3000);
            }
        }
    };

    return (
        <div className="user-list-container">
            <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Ganadores</h1>
            <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Lista de Ganadores Reto Puma</h2>
            <div className="d-flex align-items-center mb-3">
                {user && user.role === 'admin' && (
                    <Link to="/result/winners/add" className="btn btn-success me-3">Añadir Ganador <IoPersonAddSharp /></Link>
                )}
            </div>
            <div className="table-responsive">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Lugar <IoPodium /></th>
                            <th>Competición <IoTrophy /></th>
                            <th>Rider <IoPerson /></th>
                            <th>Equipo <IoPeople /></th>
                            <th>Procedencia <IoFlag /></th>
                            <th>Categoría <IoList /></th>
                            {user && user.role === 'admin' && (
                                <th>Acciones Ganador</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {winners.map((winner, index) => (
                            <tr key={winner.uuid}>
                                <td>#{index + 1}</td>
                                <td>{winner.nameCompetition}</td>
                                <td>{winner.rider}</td>
                                <td>{winner.teamName}</td>
                                <td>{winner.nationality}</td>
                                <td>{winner.category}</td>
                                {user && user.role === 'admin' && (
                                    <td>
                                        <div className="d-flex">
                                            <Link to={`/result/winners/edit/${winner.uuid}`} className="btn btn-success me-2"><IoPencil /></Link>
                                            <button onClick={() => handleDelete(winner.uuid, winner.rider)} className="btn btn-danger"><IoTrash /></button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {msg && <div className="alert alert-success mt-3">{msg}</div>}
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
    );
};

export default Winners;