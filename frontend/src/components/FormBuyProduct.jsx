import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FormBuyProduct.css';
import { useParams, Link } from 'react-router-dom';
import { IoCube, IoPricetag, IoDocumentText, IoCheckmarkCircle, IoArrowBack, IoLogoWhatsapp } from 'react-icons/io5';

const FormBuyProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState('');
  const [msg, setMsg] = useState('');
  const [url, setUrl] = useState('');
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
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const whatsappNumber = '5571669890';
  const message = `Hola, estoy interesado en el producto ${name}, ${description}. Puedes darme más información sobre él?`;

  return (
    <div className="form-buy-product-container">
      <h1 className="title mt-1" style={{ color: '#E3B04B' }}>Producto</h1>
      <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Comprar Producto {name}</h2>
      <div className="card bg-dark text-white">
        <div className="card-body">
          <form className="form-buy-product">
            <p className="text-center">{msg}</p>
            <div className="whatsapp-contact mb-3">
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`} 
                className="whatsapp-link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <IoLogoWhatsapp size={42} color='#25D366'/> 
                <span className="whatsapp-text">
                  Contáctanos vía WhatsApp para más información sobre este producto.
                </span>
              </a>
            </div>
            <div className="mb-3">
              <label className="form-label"><IoCube /> Producto:</label>
              <div className="image-container">
                <img 
                  src={url} 
                  alt="Product" 
                  className="product-image"
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label"><IoCube /> Nombre del Producto:</label>
              <input 
                type='text' 
                className="form-control text-black"
                value={name}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoPricetag /> Precio:</label>
              <input 
                type='text' 
                className="form-control text-black"
                value={`$${price}`}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoDocumentText /> Descripción:</label>
              <input
                type='text'
                className="form-control text-black"                     
                value={description}
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label"><IoCheckmarkCircle /> Disponible:</label>
              <input 
                type='text' 
                className="form-control text-black"
                value={available}
                disabled
              />
            </div>
            <Link to="/products" className="btn btn-success mt-2"><IoArrowBack /> Volver</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormBuyProduct;