import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Aviso.css';
import image1 from '../../assets/Aviso1.jpg';
import image2 from '../../assets/Aviso2.jpg';
import image3 from '../../assets/Aviso3.jpg';

const Aviso = () => {
  return (
    <div className="avisos-container">
      <h2 className="avisos-title">Avisos</h2>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={image1} alt="Primer aviso" />
          <Carousel.Caption>
            <h3>Primer Aviso</h3>
            <p>¡No te pierdas los últimos lugares disponibles!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={image2} alt="Segundo aviso" />
          <Carousel.Caption>
            <h3>Segundo Aviso</h3>
            <p>Prepárate para la competencia y atrévete a recorrer el territorio puma.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={image3} alt="Tercer aviso" />
          <Carousel.Caption>
            <h3>Tercer Aviso</h3>
            <p>¡Bienvenidos a la segunda edición del Reto Puma Bike!</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Aviso;