import React from 'react';
import Slider from 'react-slick';
import './Aviso.css';

// Importar estilos de Slick Carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import image1 from '../../assets/Aviso1.jpg';
import image2 from '../../assets/Aviso2.jpg';
import image3 from '../../assets/Aviso3.jpg';

const Aviso = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
        },
      },
    ],
  };

  const slides = [
    {
      image: image1,
      title: 'Primer Aviso',
      description: '¡No te pierdas los últimos lugares disponibles!',
    },
    {
      image: image2,
      title: 'Segundo Aviso',
      description: 'Prepárate para la competencia y atrévete a recorrer el territorio puma.',
    },
    {
      image: image3,
      title: 'Tercer Aviso',
      description: '¡Bienvenidos a la segunda edición del Reto Puma Bike!',
    },
  ];

  return (
    <div className="avisos-container">
      <h2 className="avisos-title">Avisos</h2>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="carousel-item">
            <img className="carousel-image" src={slide.image} alt={slide.title} />
            <div className="carousel-caption">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Aviso;
