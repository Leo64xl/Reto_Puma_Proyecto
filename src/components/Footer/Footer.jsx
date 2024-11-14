import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div style={{backgroundColor: 'transparent'}}>  
    <footer className="footer">
      <div className="footer-container" style={{backgroundColor: 'transparent'}}>
        <h2>RETO PUMA BIKE</h2>
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
        <p>
          En Reto Puma Bike es una experiencia única que celebra la pasión por el ciclismo. Reunimos a ciclistas de todos los niveles, con eventos de calidad, competidores internacionales y nacionales, inscripciones accesibles y una premiación emocionante. Es más que una competencia: es un desafío, una conexión y una celebración de cada kilómetro recorrido. <span className="highlight">Atrévete a recorrer el territorio puma.</span>
        </p>
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
    </footer>
    </div>
  );
};

export default Footer;