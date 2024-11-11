import React, { useState } from "react";
import {
  IoCube,
  IoPricetag,
  IoDocumentText,
  IoCheckmarkCircle,
  IoDownload,
  IoArrowBack,
} from "react-icons/io5";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/FormAddProduct.css";

const FormAddAD = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const saveAdvertisement = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:5000/advertisements', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
            <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Añadir Aviso</h1>
            <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Agregar Nuevo Aviso</h2>
            <div className="card bg-dark text-white">
            <div className="card-body">
                <form onSubmit={saveAdvertisement}>
                <p className="text-center">{msg}</p>
                <div className="mb-3">
                    <label className="form-label"><IoDownload /> Cargar Imagen:</label>
                    <input
                    type='file'
                    required
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"><IoCube /> Nombre del Aviso:</label>
                    <input
                    type="text"
                    required
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"><IoDocumentText /> Descripción:</label>
                    <textarea
                    required
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                    <IoCheckmarkCircle /> Crear Aviso
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

export default FormAddAD;
