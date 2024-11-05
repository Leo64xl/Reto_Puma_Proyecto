import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-container">
          <h2>RETO PUMA BIKE</h2>
          <nav className="footer-nav">
            <a href="#inicio">INICIO</a>
            <a href="#carrera">CARRERA</a>
            <a href="#inscripciones">INSCRIPCIONES</a>
            <a href="#resultados">RESULTADOS</a>
            <a href="#productos">PRODUCTOS</a>
            <a href="#quienes-somos">QUIÉNES SOMOS</a>
          </nav>
          <p>
            En Reto Puma Bike es una experiencia única que celebra la pasión por el ciclismo. Reunimos a ciclistas de todos los niveles, con eventos de calidad, competidores internacionales, inscripciones accesibles y una premiación emocionante. Es más que una competencia: es un desafío, una conexión y una celebración de cada kilómetro recorrido. <span className="highlight">Atravete a recorrer el territorio puma.</span>
          </p>
          <div className="footer-socials">
            <h3>Síguenos En Nuestras Redes Sociales:</h3>
            <div className="social-icons">
              <a href="https://www.instagram.com/reto_puma_bike_/?locale=%25E5%2593%25AA%25E9%2587%258C%25E8%2583%25BD%25E4%25B9%25B0%25E5%2588%25B0%25E6%25B2%25B3%25E5%258C%2597%25E7%25A7%2591%25E6%258A%2580%25E5%25B8%2588%25AD%25E8%25AF%2581%25E4%25B9%25A6%25E3%2580%2596%25E5%25A8%2581%25E4%25BF%25A1%252BTG%252F%25E9%25A3%259E%25E6%259C%25BA%253A%2540buth2788%25E3%2580%2597x4pMP3ryiCUySwQ&hl=ar" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/people/RETO-PUMA-BIKE/100092370199634/" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>

          <p className="footer-copyright">
            © 2024 Reto Puma Bike. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;