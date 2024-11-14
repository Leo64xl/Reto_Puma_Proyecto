import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMail, IoShirt, IoPeople, IoCall, IoLocation, IoTrophy, IoPerson, IoCalendar, IoList, IoBag, IoSave, IoArrowBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FormEditRegister.css';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom'; 

const FormEditRegister = () => {
  const [nameForm, setNameForm] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [nameUser2, setNameUser2] = useState('');
  const [lastnameone, setLastnameone] = useState('');
  const [lastnametwo, setLastnametwo] = useState('');
  const [birthday, setBirthday] = useState('');
  const [category1, setCategory1] = useState('');
  const [typekit, setTypekit] = useState('');
  const [talla, setTalla] = useState('');
  const [team, setTeam] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [origin, setOrigin] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getFormById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/forms/${id}`);
        setNameForm(response.data.nameForm);
        setNameUser(response.data.nameUser);
        setNameUser2(response.data.nameUser2);
        setLastnameone(response.data.lastnameone);
        setLastnametwo(response.data.lastnametwo);
        setBirthday(response.data.birthday);
        setCategory1(response.data.category1);
        setTypekit(response.data.typekit);
        setTalla(response.data.talla);
        setTeam(response.data.team);
        setPhone(response.data.phone);
        setEmail(response.data.email);
        setOrigin(response.data.origin);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getFormById();
  }, [id]);

  const updateForm = async (e) => {
    e.preventDefault();
    const confirmUpdate = window.confirm('¿Está seguro de que desea aplicar los cambios?');
    if (confirmUpdate) {
      try {
        await axios.patch(`http://localhost:5000/forms/${id}`, {
          nameForm,
          nameUser,
          nameUser2,
          lastnameone,
          lastnametwo,
          birthday,
          category1,
          typekit,
          talla,
          team,
          phone,
          email,
          origin,
        });
        navigate('/forms/register');
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="form-edit-register-container">
      <h1 className="title mt-5" style={{ color: '#E3B04B' }}>Editar Inscripción</h1>
      <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Datos Personales de {user && user.name} | Competencia {nameForm}</h2>
      <div className="card bg-dark text-white">
        <div className="card-body">
          <form onSubmit={updateForm}>
            <p className="text-center">{msg}</p>
            <div className="mb-3">
              <label className="form-label"><IoTrophy /> Nombre de la Competencia:</label>
              <input
                type='text'
                required
                className="form-control"
                value={nameForm}
                onChange={(e) => setNameForm(e.target.value)}
                placeholder='Nombre del Formulario'
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPerson /> Nombre:</label>
              <input
                type='text'
                required
                className="form-control"
                placeholder='Nombre'
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPerson /> Segundo Nombre:</label>
              <input
                type='text'
                required
                className="form-control"
                placeholder='En caso de no tener, Escribir "-"'
                value={nameUser2}
                onChange={(e) => setNameUser2(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPerson /> Apellido Paterno:</label>
              <input
                type='text'
                required
                className="form-control"
                placeholder='Apellido Paterno'
                value={lastnameone}
                onChange={(e) => setLastnameone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPerson /> Apellido Materno:</label>
              <input
                type='text'
                required
                className="form-control"
                placeholder='Apellido Materno'
                value={lastnametwo}
                onChange={(e) => setLastnametwo(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoCalendar /> Fecha de Nacimiento:</label>
              <input
                type='date'
                required
                className="form-control"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoList /> Categoría:</label>
              <select
                className="form-select"
                value={category1}
                required
                onChange={(e) => setCategory1(e.target.value)}
              >                
                <option value='Infantil Pañales Femenil'>Infantil Pañales Femenil</option>
                <option value='Infantil Pañales Varonil'>Infantil Pañales Varonil</option>
                <option value='Infantil AA Femenil'>Infantil AA Femenil</option>
                <option value='Infantil AA Varonil'>Infantil AA Varonil</option>
                <option value='Infantil C varonil'>Infantil C varonil</option>
                <option value='Infantil C femenil'>Infantil C femenil</option>
                <option value='Infantil B varonil'>Infantil B varonil</option>
                <option value='Infantil B femenil'>Infantil B femenil</option>
                <option value='Infantil A varonil'>Infantil A varonil</option>
                <option value='Infantil A femenil'>Infantil A femenil</option>
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
            <div className="mb-3">
              <label className="form-label"><IoBag /> Tipo de Kit:</label>
              <select
                className="form-select"
                value={typekit}
                required
                onChange={(e) => setTypekit(e.target.value)}
              >                
                <option value='Kit Asociacion'>Kit Asociacion</option>
                <option value='Kit Cachorro'>Kit Cachorro</option>
                <option value='Kit Puma'>Kit Puma</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label"><IoShirt /> Talla:</label>
              <select
                className="form-select"
                value={talla}
                required
                onChange={(e) => setTalla(e.target.value)}
              >                
                <option value='XS'>XS</option>
                <option value='S'>S</option>
                <option value='M'>M</option>
                <option value='G'>G</option>
                <option value='GX'>GX</option>
                <option value='GXX'>GXX</option>
                <option value='GXXX'>GXXX</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPeople /> Equipo:</label>
              <input
                type='text'
                required
                className="form-control"
                placeholder='Equipo'
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoCall /> Número de Teléfono:</label>
              <input
                type='text'
                required
                className="form-control"
                placeholder='+52 Número de Teléfono'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoMail /> Correo Electrónico:</label>
              <input
                type='text'
                required
                className="form-control"
                placeholder='Correo Electrónico'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoLocation /> Procedencia:</label>
              <select
                className="form-select"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              >
                <option>Selecciona tu Estado de Procedencia</option>
                <option value="Aguascalientes">Aguascalientes</option>
                <option value="Baja California">Baja California</option>
                <option value="Baja California Sur">Baja California Sur</option>
                <option value="Campeche">Campeche</option>
                <option value="Chiapas">Chiapas</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Ciudad de México">Ciudad de México</option>
                <option value="Coahuila">Coahuila</option>
                <option value="Colima">Colima</option>
                <option value="Durango">Durango</option>
                <option value="Estado de México">Estado de México</option>
                <option value="Guanajuato">Guanajuato</option>
                <option value="Guerrero">Guerrero</option>
                <option value="Hidalgo">Hidalgo</option>
                <option value="Jalisco">Jalisco</option>
                <option value="Michoacán">Michoacán</option>
                <option value="Morelos">Morelos</option>
                <option value="Nayarit">Nayarit</option>
                <option value="Nuevo León">Nuevo León</option>
                <option value="Oaxaca">Oaxaca</option>
                <option value="Puebla">Puebla</option>
                <option value="Querétaro">Querétaro</option>
                <option value="Quintana Roo">Quintana Roo</option>
                <option value="San Luis Potosí">San Luis Potosí</option>
                <option value="Sinaloa">Sinaloa</option>
                <option value="Sonora">Sonora</option>
                <option value="Tabasco">Tabasco</option>
                <option value="Tamaulipas">Tamaulipas</option>
                <option value="Tlaxcala">Tlaxcala</option>
                <option value="Veracruz">Veracruz</option>
                <option value="Yucatán">Yucatán</option>
                <option value="Zacatecas">Zacatecas</option>
              </select>
            </div>
              <div className="d-flex justify-content-between">
                <Link to="/forms/register" className="btn btn-success mt-2">
                    <IoArrowBack /> Volver
                </Link>
                <button type='submit' className='btn btn-success mt-2'>Guardar Cambios <IoSave /></button>
              </div>
          </form>
        </div>
      </div>

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

export default FormEditRegister;