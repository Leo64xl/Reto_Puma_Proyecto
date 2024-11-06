import React, { useState, useEffect } from 'react';
import { IoMail, IoShirt, IoPeople, IoCall, IoLocation, IoTrophy, IoPerson, IoCalendar, IoList, IoBag, IoArrowBack } from 'react-icons/io5';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FormAdmin.css';

const FormAdmin = () => {
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

  return (
    <div className="form-admin-container">
      <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Registro</h1>
      <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Detalles de {nameUser} | {nameForm}</h2>
      <div className="card bg-dark text-white">
        <div className="card-body">
          <form>
            <p className="text-center">{msg}</p>
            <div className="mb-3">
              <label className="form-label"><IoTrophy /> Nombre de la Competencia:</label>
              <input
                type='text'
                className="form-control text-black"
                value={nameForm}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPerson /> Nombre:</label>
              <input
                type='text'
                className="form-control text-black"
                value={nameUser}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPerson /> Segundo Nombre:</label>
              <input
                type='text'
                className="form-control text-black"
                value={nameUser2}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPerson /> Apellido Paterno:</label>
              <input
                type='text'
                className="form-control text-black"
                value={lastnameone}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPerson /> Apellido Materno:</label>
              <input
                type='text'
                className="form-control text-black"
                value={lastnametwo}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoCalendar /> Fecha de Nacimiento:</label>
              <input
                type='date'
                className="form-control text-black"
                value={birthday}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoList /> Categoría:</label>
              <input
                type='text'
                className="form-control text-black"
                value={category1}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoBag /> Tipo de Kit:</label>
              <input
                type='text'
                className="form-control text-black"
                value={typekit}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoShirt /> Talla:</label>
              <input
                type='text'
                className="form-control text-black"
                value={talla}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPeople /> Equipo:</label>
              <input
                type='text'
                className="form-control text-black"
                value={team}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoCall /> Número de Teléfono:</label>
              <input
                type='text'
                className="form-control text-black"
                value={phone}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoMail /> Correo Electrónico:</label>
              <input
                type='text'
                className="form-control text-black"
                value={email}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoLocation /> Ubicación:</label>
              <input
                type='text'
                className="form-control text-black"
                value={origin}
                disabled
              />
            </div>
            <Link to="/forms/view/admin" className="btn btn-success mt-2"><IoArrowBack /> Volver</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAdmin;