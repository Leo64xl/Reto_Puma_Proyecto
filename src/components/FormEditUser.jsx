import React, { useState, useEffect } from 'react';
import { IoMail, IoLockClosed } from "react-icons/io5"; 
import '../styles/FormEditUser.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormEditUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [role, setRole] = useState('');    
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);          
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        email,
        password,
        confPassword,
        role
      });
      navigate('/users');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="form-edit-user-container">
      <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Editar Usuario</h1>
      <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Actualizar Usuario {name}</h2>
      <div className="card bg-dark text-white">
        <div className="card-body">
          <form onSubmit={updateUser}>
            <p className="text-center">{msg}</p>
            <div className="mb-3">
              <label className="form-label"><IoMail /> Nombre:</label>
              <input 
                type='text' 
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nombre'                                 
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoMail /> Email:</label>
              <input 
                type='text' 
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'                                 
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoLockClosed /> Contraseña:</label>
              <input 
                type='password' 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='******'   
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoLockClosed /> Confirmar Contraseña:</label>
              <input 
                type='password' 
                className="form-control" 
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder='******'   
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoLockClosed /> Rol:</label>
              <select 
                className="form-select"
                value={role} 
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button type='submit' className='btn btn-success mt-2'>Guardar Cambios</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default FormEditUser;