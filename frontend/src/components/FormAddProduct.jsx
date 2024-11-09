import React, { useState } from 'react';
import { IoCube, IoPricetag, IoDocumentText, IoCheckmarkCircle, IoDownload } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FormAddProduct.css';

const FormAddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState(''); 
  const [msg, setMsg] = useState('');
  const [image, setImage] = useState(null); 
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(); 
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('available', available);
    if (image) {
      formData.append('image', image); 
    }

    try {
      await axios.post('http://localhost:5000/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      navigate('/products');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="form-add-product-container">
      <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Añadir Producto</h1>
      <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Agregar Nuevo Producto</h2>
      <div className="card bg-dark text-white">
        <div className="card-body">
          <form onSubmit={saveProduct}>
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
                <label className="form-label"><IoCube /> Nombre del Producto:</label>
                <input 
                  type='text' 
                  required
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Nombre del Producto'                                 
                />
              </div>
              <div className="mb-3">
                <label className="form-label"><IoPricetag /> Precio:</label>
                <input 
                  type='text' 
                  required
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder='Precio'                                 
                />
              </div>
              <div className="mb-3">
                <label className="form-label"><IoDocumentText /> Descripción:</label>
                <input 
                  type='text' 
                  required
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Descripción'                                 
                />
              </div>
              <div className="mb-3">
                <label className="form-label"><IoCheckmarkCircle /> Unidades Disponibles:</label>
                <input
                  type='text' 
                  className="form-control"
                  required
                  value={available} 
                  onChange={(e) => setAvailable(e.target.value)}
                  placeholder='Unidades Disponibles'
                />                
              </div>            
            <button type='submit' className='btn btn-success mt-2'>Guardar Producto</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddProduct;