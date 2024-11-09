import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoCheckmarkCircle, IoDownload, IoTrash } from "react-icons/io5";
import { saveAs } from 'file-saver';
import "../styles/FormViewAD.css";
import { Link } from "react-router-dom";

const FormViewAD = () => {
  const [forms, setForms] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [msg, setMsg] = useState('');
  const [totalRegistros, setTotalRegistros] = useState(0); // Definir el estado totalRegistros

  useEffect(() => {
    getForms();
  }, []);

  const getForms = async () => {
    try {
      const response = await axios.get("http://localhost:5000/forms");
      setForms(response.data);
      setTotalRegistros(response.data.length); // Actualizar el número total de registros
    } catch (error) {
      console.error("Error al obtener los formularios:", error);
    }
  };

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm('¿Está seguro de que desea eliminar este registro?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/forms/${uuid}`);
        setMsg('Registro eliminado correctamente.');
        setForms(forms.filter(form => form.uuid !== uuid));
        setTotalRegistros(totalRegistros - 1); // Actualizar el número total de registros
        setTimeout(() => setMsg(''), 2500);
      } catch (error) {
        setMsg('Ocurrio una falla al eliminar el Registro.');
        setTimeout(() => setMsg(''), 3000);
      }
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get("http://localhost:5000/download-excel", {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'Forms.xlsx');
    } catch (error) {
      console.error("Error al descargar el archivo Excel:", error);
      setMsg('Error al descargar el archivo Excel.');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  return (
    <div className="form-view-ad-container">
      <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Inscripciones</h1>
      <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Lista Completa de Inscripciones</h2>
      <div className="d-flex align-items-center mb-3">
        <button onClick={handleDownloadExcel} className="btn btn-success me-3">
          Descargar Inscripciones <IoDownload />
        </button>
        <span className="badge bg-info text-dark">
          <IoCheckmarkCircle style={{ marginRight: '5px' }} />
           Se Han Inscrito: {totalRegistros} Usuarios
        </span>
      </div>
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Correo Electrónico</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Competicion</th>
              <th>Equipo</th>
              <th>Acciones Registros</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, index) => (
              <tr key={form.uuid}>
                <td>{index + 1}</td>
                <td>{form.email}</td>
                <td>{form.nameUser}</td>
                <td>{form.lastnameone}</td>
                <td>{form.nameForm}</td>
                <td>{form.team}</td>
                <td>
                  <Link to={`/forms/view/admin/form/${form.uuid}`} className="btn btn-primary">
                    Ver Registro
                  </Link>
                  <button onClick={() => handleDelete(form.uuid)} className="btn btn-danger ms-2">
                    <IoTrash/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {msg && <div className="alert alert-danger mt-3">{msg}</div>}
    </div>
  );
};

export default FormViewAD;