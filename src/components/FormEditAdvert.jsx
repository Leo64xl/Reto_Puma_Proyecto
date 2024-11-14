import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { IoCube, IoDocumentText, IoCheckmarkCircle, IoDownload, IoArrowBack } from 'react-icons/io5';
import "bootstrap/dist/css/bootstrap.min.css";

const FormEditAdvert = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getAdvertById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/advertisements/${id}`);
        setName(response.data.name);
        setUrl(response.data.url);
        setDescription(response.data.description);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getAdvertById();
  }, [id]);

  const updateAdvert = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('url', url);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }

      await axios.patch(`http://localhost:5000/advertisements/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/advertisements');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div>
      <div className="form-add-product-container">
        <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Editar Aviso</h1>
        <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Editar: {name}</h2>
        <div className="card bg-dark text-white">
          <div className="card-body">
            <form onSubmit={updateAdvert}>
              <p className="text-center">{msg}</p>
              <div className="mb-3">
                <label className="form-label"><IoDownload /> Cargar Nueva Imagen:</label>
                <input
                  type='file'
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="mb-3">
                <label className="form-label"><IoCube /> Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label"><IoDocumentText /> Descripción:</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  <IoCheckmarkCircle /> Guardar
                </button>
                <Link to="/advertisements" className="btn btn-danger">
                  <IoArrowBack /> Volver
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEditAdvert;