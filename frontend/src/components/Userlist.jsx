import React, { useState, useEffect } from "react";
import "../styles/Userlist.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoBrush, IoTrash, IoPersonAddSharp, IoCheckmarkCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");
  const [totalUsuarios, setTotalUsuarios] = useState(0); // Definir el estado totalUsuarios

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
      setTotalUsuarios(response.data.length); // Actualizar el número total de usuarios
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const handleDelete = async (uuid, name) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${name}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/users/${uuid}`);
        setMsg('Usuario eliminado exitosamente');
        setUsers(users.filter(user => user.uuid !== uuid));
        setTotalUsuarios(totalUsuarios - 1); // Actualizar el número total de usuarios
        setTimeout(() => setMsg(''), 2500);
      } catch (error) {
        setMsg('No se pudo eliminar al usuario.');
        setTimeout(() => setMsg(''), 3000);
      }
    }
  };

  return (
    <div className="user-list-container">
      <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Usuarios</h1>
      <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Administrar Usuarios</h2>
      <div className="d-flex align-items-center mb-3">
        <Link to="/users/add" className="btn btn-success me-3">Crear Usuario <IoPersonAddSharp /></Link>
        <span className="badge bg-info text-dark">
          <IoCheckmarkCircle style={{ marginRight: '5px' }} />
            Cuentas Creadas: {totalUsuarios} Cuentas
        </span>
      </div>
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.uuid}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/users/edit/${user.uuid}`} className="btn btn-primary me-2"><IoBrush /></Link>
                  <button onClick={() => handleDelete(user.uuid, user.name)} className="btn btn-danger ms-2"><IoTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {msg && <div className="alert alert-success mt-3">{msg}</div>}
    </div>
  );
};

export default Userlist;