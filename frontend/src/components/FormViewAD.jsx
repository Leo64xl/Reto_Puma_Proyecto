import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoDownload, IoTrash } from "react-icons/io5";
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/FormViewAD.css";

const FormViewAD = () => {
  const [forms, setForms] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getForms();
  }, []);

  const getForms = async () => {
    const response = await axios.get("http://localhost:5000/forms");
    setForms(response.data);
  };

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Register?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/forms/${uuid}`);
        setMsg('Register deleted successfully.');
        setForms(forms.filter(form => form.uuid !== uuid));
        setTimeout(() => setMsg(''), 2500);
      } catch (error) {
        setMsg('Failed to delete the Register.');
        setTimeout(() => setMsg(''), 3000);
      }
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get('http://localhost:5000/download-excel', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Forms.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      setMsg('Error downloading Excel file.');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  return (
    <div className="form-view-ad-container">
      <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Registros</h1>
      <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Lista Completa de Registros</h2>
      <button onClick={handleDownloadExcel} className="btn btn-success mb-3">Reporte Excel <IoDownload /></button>
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Mostrar Registros</th>
            </tr>
          </thead>

          <tbody>
            {forms.map((form, index) => (
              <tr key={form.uuid}>
                <td>{index + 1}</td>
                <td>{form.nameUser}</td>
                <td>{form.lastnameone}</td>
                <td>{form.email}</td>
                <td>{form.phone}</td>
                <td>
                  <Link to={`/forms/view/admin/form/${form.uuid}`} className="btn btn-primary me-2">Mostrar Registro</Link>
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

export default FormViewAD;