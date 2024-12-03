import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoBrush, IoTrash, IoPersonAddSharp, IoCheckmarkCircle, IoPersonCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useUser } from "../UserContext"; // Importa el contexto del usuario
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/MyAccount.css";

const MyAccount = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { setUserId } = useUser(); // Usa el contexto del usuario
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      getUser(user.uuid);
    }
  }, [user]);

  const getUser = async (uuid) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${uuid}`);
      setUserDetails(response.data);     
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  const handleDelete = async (uuid, name) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar tu cuenta ${name}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/users/${uuid}`);
        setMsg('Cuenta eliminada exitosamente');
        setUserDetails(null);
        setTimeout(() => {
          setMsg('');
          navigate("/");
        }, 2000);
      } catch (error) {
        setMsg('No se pudo eliminar la cuenta.');
        setTimeout(() => setMsg(''), 2000);
      }
    }
  };

  const handleEdit = () => {
    setUserId(userDetails.uuid); // Almacena el ID del usuario en el contexto
    navigate("/my/account/edit");
  };

  return (
    <div className="container-acc">
      <div className="account-container">
        <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Mi Cuenta: {user && user.name}</h1>
        <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Administrar Mi Cuenta <IoPersonCircle /></h2>
        {userDetails ? (
          <div className="account-details">
            <div className="account-info">
              <p><strong>Nombre:</strong> {userDetails.name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Rol:</strong> {userDetails.role}</p>
            </div>
            <div className="account-actions">
              <button onClick={handleEdit} className="btn btn-primary me-2"><IoBrush /> Editar</button>
              <button onClick={() => handleDelete(userDetails.uuid, userDetails.name)} className="btn btn-danger ms-2"><IoTrash /> Eliminar</button>
            </div>
          </div>
        ) : (
          <p>No se encontró información del usuario.</p>
        )}
        {msg && <div className="alert alert-success mt-3">{msg}</div>}
      </div>
    </div>
  );
};

export default MyAccount;