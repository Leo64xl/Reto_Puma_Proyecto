import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoAddCircle, IoTrash, IoCheckmarkCircle, IoDocument } from "react-icons/io5";
import { useSelector } from 'react-redux'; // Asegúrate de que useSelector esté importado correctamente
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/FormView.css";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"; 

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
              <th>Tipo de Kit</th>
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
                <td>{form.typekit}</td>
                <td>
                {user && (user.role === 'user' || user.role === 'admin') && (
                    <>
                      {user.role === 'user' && form.userId === user.id && (
                        <>
                          <Link to={`/forms/register/edit/${form.uuid}`} className="btn btn-primary me-2">Editar Inscripción</Link>
                          <button onClick={() => handleDelete(form.uuid)} className="btn btn-danger ms-2"><IoTrash /></button>
                        </>
                      )}
                      {user.role === 'admin' && (
                        <>
                          <Link to={`/forms/view/admin/form/${form.uuid}`} className="btn btn-primary me-2">Ver Inscripción <IoDocument/></Link>                    
                        </>
                      )}
                    </>
                  )}
                </td>
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
          <Link to= "/dashboard">
            <a href="#inicio">INICIO</a>
          </Link>
          <Link to= "/ruta">
              <a>RUTA</a>
          </Link>
          <Link to= "/forms/register">
             <a>"INSCRIPCIONES"</a>
          </Link>
          <Link to= "/result/winners">
              <a>RESULTADOS</a>
          </Link>
          <Link to= "/products">
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

export default FormView;