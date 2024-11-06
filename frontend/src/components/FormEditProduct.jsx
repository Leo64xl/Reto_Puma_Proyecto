import React, { useState, useEffect } from 'react';
import { IoMail, IoCube, IoPricetag, IoDocumentText, IoCheckmarkCircle, IoArrowBack, IoLogoWhatsapp, IoDownload } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FormEditProduct.css';

const FormEditProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState('');
  const [msg, setMsg] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setAvailable(response.data.available);
        setUrl(response.data.url);
        setImage(response.data.image);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('available', available);
      formData.append('url', url);
      formData.append('image', image);

      await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/products');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="form-edit-product-container">
      <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Producto</h1>
      <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Editar Producto {name}</h2>
      <div className="card bg-dark text-white">
        <div className="card-body">
          <form onSubmit={updateProduct} className="form-edit-product">
            <p className="text-center">{msg}</p>
            <div className="mb-3">
              <label className="form-label"><IoDownload /> Subir nueva imagen:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoCube /> Nombre del producto:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPricetag /> Precio:</label>
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoDocumentText /> Descripción:</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoCheckmarkCircle /> Disponible:</label>
              <select
                className="form-select"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
              >
                <option>Selecciona Una Opcion</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="d-flex justify-content-between">
              <Link to="/products" className="btn btn-success"><IoArrowBack /> Volver </Link>
              <button type="submit" className="btn btn-success">Actualizar Producto</button>              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;