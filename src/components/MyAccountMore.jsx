import React, { useState, useEffect } from "react";
import { IoMail, IoLockClosed, IoPerson, IoSave } from "react-icons/io5";
import "../styles/MyAccountMore.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext"; // Importa el contexto del usuario
import "bootstrap/dist/css/bootstrap.min.css";

const MyAccountMore = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");   
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { userId } = useUser(); // Usa el contexto del usuario

  useEffect(() => {
    const getUserById = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);            
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    if (userId) {
      getUserById(userId);
    }
  }, [userId]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        name,
        email,
        password,
        confPassword            
      });
      navigate("/my/account");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="my-account-more-container">
      <h1 className="my-account-more-title mt-1">Mi Cuenta: {name}</h1>
      <h2 className="my-account-more-subtitle mt-1">Ajustes adicionales de tu cuenta</h2>
      <div className="my-account-more-card bg-dark text-white">
        <div className="my-account-more-card-body">
          <form onSubmit={updateUser}>
            <p className="text-center">{msg}</p>
            <div className="my-account-more-form-group mb-3">
              <label className="my-account-more-form-label"><IoPerson /> Nombre:</label>
              <input 
                type='text' 
                className="my-account-more-form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nombre'                                 
              />
            </div>
            <div className="my-account-more-form-group mb-3">
              <label className="my-account-more-form-label"><IoMail /> Email:</label>
              <input 
                type='text' 
                className="my-account-more-form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'                                 
              />
            </div>
            <div className="my-account-more-form-group mb-3">
              <label className="my-account-more-form-label"><IoLockClosed /> Contraseña:</label>
              <input 
                type='password' 
                className="my-account-more-form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='******'   
              />
            </div>
            <div className="my-account-more-form-group mb-3">
              <label className="my-account-more-form-label"><IoLockClosed /> Confirmar Contraseña:</label>
              <input 
                type='password' 
                className="my-account-more-form-control" 
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder='******'   
              />
            </div>
            <button type='submit' className='my-account-more-btn btn btn-success mt-2'>Guardar Cambios <IoSave /></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccountMore;