import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMail, IoShirt, IoPeople, IoCall, IoLocation, IoTrophy, IoPerson, IoCalendar, IoList, IoBag, IoSave } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FormEditRegister.css';

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
  };

  return (
    <div className="form-edit-register-container">
      <h1 className="title mt-5" style={{ color: '#E3B04B' }}>Editar Registro</h1>
      <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Datos Personales de {nameUser} | Competencia {nameForm}</h2>
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
                placeholder='Segundo Nombre'
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
              <label className="form-label"><IoLocation /> Ubicación:</label>
              <input
                type='text'
                className="form-control"
                required
                placeholder='Ubicación'
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
            <button type='submit' className='btn btn-success mt-2'>Guardar Cambios</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEditRegister;