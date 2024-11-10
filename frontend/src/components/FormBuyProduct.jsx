import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FormBuyProduct.css';
import { useParams, Link } from 'react-router-dom';
import { IoCube, IoPricetag, IoDocumentText, IoCheckmarkCircle, IoArrowBack, IoLogoWhatsapp } from 'react-icons/io5';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"; 

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

  const whatsappNumber = '7298027939';
  const message = `Hola, estoy interesado en el producto ${name}. ${description}. ¿Podrías darme más información sobre él?`;

  return (
    <div>
      <div className="form-buy-product-container">
        <h1 className="title mt-15" style={{ color: '#E3B04B' }}>Producto {name}</h1>
        <h2 className="subtitle mt-1" style={{ color: '#ffffff' }}>Producto: {name} | Precio: ${price} mx</h2>
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
                  <IoLogoWhatsapp size={42} color='#ffffff'/> 
                  <span className="whatsapp-text">
                    Pregunta por este producto en WhatsApp, haz clic aquí.
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
                  value={`$${price} mx`}
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
                <label className="form-label"><IoCheckmarkCircle /> Unidades Disponibles:</label>
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

      {/* Contenedor de información adicional */}
      <div className="info-adicional p-3 mb-3 mt-5" style={{ backgroundColor: 'transparent', borderRadius: '8px', marginRight: '100px', marginLeft: '100px'}}>
        <p className="footer-socials" style={{ fontSize: '30px', fontWeight: 'bold', color: '#e3b04b' }}>RETO PUMA</p>
        <nav className="footer-nav">
          <Link to="/dashboard">
            <a href="#inicio">INICIO</a>
          </Link>
          <Link to="/ruta">
            <a>RUTA</a>
          </Link>
          <Link to="/forms/register">
            <a>"INSCRIPCIONES"</a>
          </Link>
          <Link to="/result/winners">
            <a>RESULTADOS</a>
          </Link>
          <Link to="/products">
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

export default FormBuyProduct;