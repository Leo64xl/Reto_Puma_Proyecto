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
    <>
      <h1 className='title has-text-dark mt-1'>Product</h1>
      <h2 className='subtitle mt-1'>Buy Product {name}</h2>
    <div className="product-container">
          
      <div className='card has-text-dark product-card' style={{backgroundColor: '#ffffff'}}>
        <div className='card-content' style={{backgroundColor: '#ffffff'}}>
          <div className='content'>
            <form className='has-text-dark'>
                <div className="whatsapp-contact">
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`} 
                    className="whatsapp-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <IoLogoWhatsapp size={27} color='#25D366'/> 
                    <span className="whatsapp-text">
                      Contáctanos vía WhatsApp para más información sobre este producto.
                    </span>
                  </a>
                </div>
              <div className="field">
                <label className='label has-text-dark'><IoCube /> Product:</label>
                <div className="control image-container">
                  <img 
                    src={url} 
                    alt="Product" 
                    className="product-image"
                  />
                </div>
              </div>
              
              <div className="field">
                <label className='label has-text-dark'><IoCube /> Product Name:</label>
                <div className="control">
                  <input 
                    type='text' 
                    className="input2"
                    value={name}
                    disabled
                  />
                </div>
              </div>
              
              <div className="field">
                <label className='label has-text-dark'><IoPricetag /> Price:</label>
                <div className="control">
                  <input 
                    type='text' 
                    className="input2"
                    value={`$${price}`}
                    disabled
                  />
                </div>
              </div>

              <div className="field">
                <label className='label has-text-dark'><IoDocumentText /> Description:</label>
                <div className="control">
                  <input
                    type='text'
                    className="input2"                     
                    value={description}
                    disabled
                  />
                </div>
              </div>
              
              <div className="field">
                <label className='label has-text-dark'><IoCheckmarkCircle /> Available:</label>
                <div className="control">
                  <input 
                    type='text' 
                    className="input2"
                    value={available}
                    disabled
                  />
                </div>
              </div>
              <Link to="/products" className="buttonAdd mt-2"><IoArrowBack /> Return Page</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default FormBuyProduct;