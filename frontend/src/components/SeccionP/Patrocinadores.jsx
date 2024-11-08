import React from 'react';
import './Patrocinadores.css';

import patron1 from '../../assets/PatrocinadoresHIMG/ALTARA.jpg';
import patron2 from '../../assets/PatrocinadoresHIMG/Axelne.png';
import patron3 from '../../assets/PatrocinadoresHIMG/CL.jpg';
import patron4 from '../../assets/PatrocinadoresHIMG/CVM.png';
import patron5 from '../../assets/PatrocinadoresHIMG/Donchon.png';
import patron6 from '../../assets/PatrocinadoresHIMG/DrSalinas.png';
import patron7 from '../../assets/PatrocinadoresHIMG/DrSalvador.png';
import patron8 from '../../assets/PatrocinadoresHIMG/Frailes.png';
import patron9 from '../../assets/PatrocinadoresHIMG/Mariscos.png';
import patron10 from '../../assets/PatrocinadoresHIMG/Ninis.png';
import patron11 from '../../assets/PatrocinadoresHIMG/PEIK.png';
import patron12 from '../../assets/PatrocinadoresHIMG/PlazaV.png';
import patron13 from '../../assets/PatrocinadoresHIMG/SraLeo.png';
import patron14 from '../../assets/PatrocinadoresHIMG/Valle.png';
import patron15 from '../../assets/PatrocinadoresHIMG/Vvazques.png';
import patron16 from '../../assets/PatrocinadoresHIMG/ahc.png';
import patron17 from '../../assets/PatrocinadoresHIMG/ala.jpg';
import patron18 from '../../assets/PatrocinadoresHIMG/cherry.png';
import patron19 from '../../assets/PatrocinadoresHIMG/daxi.png';
import patron20 from '../../assets/PatrocinadoresHIMG/delatostada.png';
import patron21 from '../../assets/PatrocinadoresHIMG/diamante.png';
import patron22 from '../../assets/PatrocinadoresHIMG/diente.png';
import patron23 from '../../assets/PatrocinadoresHIMG/kira.png';
import patron24 from '../../assets/PatrocinadoresHIMG/naturalli.png';
import patron25 from '../../assets/PatrocinadoresHIMG/ride.png';
import patron26 from '../../assets/PatrocinadoresHIMG/sannicolas.png';
import patron27 from '../../assets/PatrocinadoresHIMG/yolo.png';

const sponsors = [
  patron1, patron2, patron3, patron4, patron5, patron6, patron7, patron8, patron9,
  patron10, patron11, patron12, patron13, patron14, patron15, patron16, patron17,
  patron18, patron19, patron20, patron21, patron22, patron23, patron24, patron25,
  patron26, patron27
];

const Patrocinadores = () => {
  return (
    <div className='patrocinadores'>
      <div className='container'>
        <h2>Patrocinadores Humildes</h2>
        <div className='sponsors-grid'>
          {sponsors.map((sponsor, index) => (
            <div key={index} className='sponsor-item'>
              <img src={sponsor} alt={`Patrocinador ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patrocinadores;