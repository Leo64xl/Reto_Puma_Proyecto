import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoAddCircle, IoTrash, IoCheckmarkCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/FormView.css";

const FormView = () => {
  const [forms, setForms] = useState([]);
  const [userForms, setUserForms] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getForms();
  }, [user]);

  const getForms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/forms");
      setForms(response.data);
      if (user && user.role === 'user') {
        const userForms = response.data.filter(form => form.userId === user.id);
        setUserForms(userForms);
      }
    } catch (error) {
      console.error("Failed to fetch forms:", error);
    }
  };

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm('¿Está seguro que desea eliminar este registro?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/forms/${uuid}`);
        setMsg('Registro eliminado exitosamente.');
        setForms(forms.filter(form => form.uuid !== uuid));
        if (user && user.role === 'user') {
          setUserForms(userForms.filter(form => form.uuid !== uuid));
        }
        setTimeout(() => setMsg(''), 2500);
      } catch (error) {
        setMsg('No se pudo eliminar el registro.');
        setTimeout(() => setMsg(''), 3000);
      }
    }
  };

  return (
    <div className="form-view-container">
      {user && user.role === 'admin' && (
        <>
        <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Registros</h1>
          <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Lista Completa Admin</h2>
        </>
      )}

      {user && user.role === 'user' && (
        <>
          <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Inscripción</h1>
          <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Mi Inscripción {user && user.name}</h2>
        </>
      )}

      {user && user.role === 'user' && userForms.length === 0 && (
        <Link to="/forms/register/add" className="btn btn-success mb-3">Realizar Inscripción <IoAddCircle /></Link>
      )}

      {user && user.role === 'user' && userForms.length > 0 && (
        <div className="register-message">
         Ya has realizado una Inscripción<IoCheckmarkCircle className="checkmark-icon" />
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Categoria</th>
              <th>Equipo</th>
              <th>Acciones Inscripción</th>
            </tr>
          </thead>

          <tbody>
            {forms.map((form, index) => (
              <tr key={form.uuid}>
                <td>{index + 1}</td>
                <td>{form.nameUser}</td>
                <td>{form.lastnameone}</td>
                <td>{form.category1}</td>
                <td>{form.team}</td>
                <td>
                  {user && (user.role === 'admin' || form.userId === user.id) && (
                    <>
                      <Link to={`/forms/register/edit/${form.uuid}`} className="btn btn-primary me-2">Editar Inscripción</Link>
                      <button onClick={() => handleDelete(form.uuid)} className="btn btn-danger ms-2"><IoTrash /></button>
                    </>
                  )}
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

export default FormView;