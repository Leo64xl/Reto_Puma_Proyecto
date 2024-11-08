import React from 'react';
import './About.css';
import cyclingImage from '../../assets/video.jpg';

const About = () => {
  return (
    <section className="about-us">
      <div className="about-us-content">
        <h2>¿Quiénes Somos?</h2>
        <p>
          Somos una comunidad apasionada por el ciclismo, dedicada a promover
          la participación y el espíritu deportivo en todas las edades.
          Organizamos eventos y competencias que reúnen a ciclistas de todas
          partes, fomentando un ambiente de sana convivencia y desarrollo
          personal.
        </p>
      </div>
      <div className="about-us-image">
        <img src={cyclingImage} alt="Ciclistas en carrera" />
      </div>
    </section>
  );
};

export default About;