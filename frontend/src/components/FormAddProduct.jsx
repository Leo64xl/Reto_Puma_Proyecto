import React, { useState } from 'react';
import { IoMail } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/FormAddProduct.css'

// formulario donde se añaden nuevos productos
const FormAddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState('yes'); // Cambiado por defecto a 'yes'
  const [msg, setMsg] = useState('');
  const [image, setImage] = useState(null); // Estado para la imagen
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Crear un FormData para enviar datos y archivos
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('available', available);
    if (image) {
      formData.append('image', image); // Añadir la imagen al FormData
    }

    try {
      await axios.post('http://localhost:5000/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Especificar el tipo de contenido
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
    <div>
      <h1 className='title has-text-dark'>Products</h1>
      <h2 className='subtitle'>Add New Products</h2>
      <div className='card has-text-dark' style={{ backgroundColor: '#ffffff' }}>
        <div className='card-content' style={{ backgroundColor: '#ffffff' }}>
          <div className='content'>
            <form
              onSubmit={saveProduct}
              className='has-text-dark'
              style={{ backgroundColor: '#ffffff' }}>
              <p className='has-text-centered'>{msg}</p>

              <div className="field" style={{ backgroundColor: '#ffffff' }}>
                <label className='label has-text-dark'><IoMail /> Product Name:</label>
                <div className="control">
                  <input
                    type='text'
                    className="input2"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Product Name'
                  />
                </div>
              </div>

              <div className="field">
                <label className='label has-text-dark'><IoMail /> Price:</label>
                <div className="control">
                  <input
                    type='text'
                    required
                    className="input2"
                    placeholder='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className='label has-text-dark'><IoMail /> Description:</label>
                <div className="control">
                  <input
                    type='text'
                    className="input2"
                    placeholder='Description'
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className='label has-text-dark'><IoMail /> Available:</label>
                <div className="control">
                  <div className='selectOptions2'>
                    <select
                      required
                      value={available}
                      onChange={(e) => setAvailable(e.target.value)}>
                      <option value='Yes'>Yes</option>
                      <option value='No'>No</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Nuevo campo para seleccionar imagen */}
              <div className="field">
                <label className='label has-text-dark'><IoMail /> Upload Image:</label>
                <div className="control">
                  <input
                    type='file'
                    className="input2"
                    accept="image/*" // Aceptar solo archivos de imagen
                    onChange={(e) => setImage(e.target.files[0])} // Almacenar el archivo seleccionado
                  />
                </div>
              </div>

              <div className="field">
                <div className='buttonSave'>
                  <button
                    className='button is-success'
                    type='submit'>
                    Save Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormAddProduct;
