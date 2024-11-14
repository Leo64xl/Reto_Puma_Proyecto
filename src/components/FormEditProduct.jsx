import React, { useState, useEffect } from 'react';
import { IoMail, IoCube, IoPricetag, IoDocumentText, IoCheckmarkCircle, IoArrowBack, IoLogoWhatsapp, IoDownload } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FormEditProduct.css';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"; 

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
      <h1 className="title mt-5" style={{ color: '#E3B04B' }}>Producto</h1>
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
              <label className="form-label"><IoCheckmarkCircle /> Unidades disponibles:</label>
              <input
                type="text"
                className="form-control"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
                placeholder='Unidades disponibles'
              />                
            </div>
            <div className="d-flex justify-content-between">
              <Link to="/products" className="btn btn-success mt-1"><IoArrowBack /> Volver </Link>
              <button type="submit" className="btn btn-success mt-1">Actualizar Producto</button>              
            </div>
          </form>
        </div>
      </div>
        {/* Contenedor de información adicional */}
        <div className="info-adicional p-3 mb-3 mt-5" style={{ backgroundColor: '#transparent', borderRadius: '8px' }}>
        <p className="footer-socials" style={{ fontSize: '30px', fontWeight: 'bold' }}>RETO PUMA</p>
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

export default FormEditProduct;