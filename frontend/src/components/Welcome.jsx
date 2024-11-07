import React from 'react';
//import { useSelector } from 'react-redux';
import '../styles/Welcome.css';
import Sponsor from './patrocinadores/Sponsor';
import Footer from './Footer/Footer';
import About from './About us/About';
import Aviso from './Avisos/Aviso';

const Welcome = () => {
  //const { user } = useSelector((state) => state.auth);
  return (
    <div>
        <div className="welcome-container">
        {/* Video de fondo */}
        <iframe
          className="background-video"
          src="https://www.youtube.com/embed/k0BfLk6TXLE?autoplay=1&mute=1&loop=1&playlist=k0BfLk6TXLE&controls=0&cc_load_policy=0"
          title="cycling motivation (MTB) 2020"
          frameBorder="0"
          scrolling="no"
          style={{ backgroundColor: 'transparent', border: '0' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>

        <div className="content">
        <h1>RETO <span className="yellow-text">PUMA</span> BIKE</h1>
        </div>
      </div>

      {/* Componente Sponsor*/}
      <div className="sponsor-section">
        <Sponsor />
      </div>

      {/* Componente Avisos */}
      <div className="avisos-container">
        <Aviso />
      </div>

      {/* Componente About */}
      <div className="about-us-section">
        <About />
      </div>

      {/* Componente Footer */}
      <Footer />
    </div>
  )
}

export default Welcome