import React from 'react';
import './Anuncio.css';
import imagenAnuncio from '../../assets/Anuncio/jersey.jpg'; 
import { Link } from 'react-router-dom';

const Anuncio = () => {
  return (
    <section className="anuncio">
      <div className="anuncio-container">
        <div className="anuncio-imagen">
          <img src={imagenAnuncio} alt="" />
        </div>
        <div className="anuncio-texto">
          <h1>¡LOS RECUERDOS SON PARA SIEMPRE!</h1>
          <p>Colección de Reto Puma Bike</p>
          <Link to= "/products">
            <button className="anuncio-boton">Comprar Ahora</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Anuncio;

