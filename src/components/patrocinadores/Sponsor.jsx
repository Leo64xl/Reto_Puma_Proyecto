import React from "react";
import "./Sponsor.css";
import sponsor1 from "../../assets/PatrocinadoresIMG/logo farmaymás.png";
import sponsor2 from "../../assets/PatrocinadoresIMG/logo perez.png";
import sponsor3 from "../../assets/PatrocinadoresIMG/logoGORDOBIKEPNG.png";
import sponsor4 from "../../assets/PatrocinadoresIMG/logoagustinos.png";
import sponsor5 from "../../assets/PatrocinadoresIMG/logoboxthas.png";
import sponsor6 from "../../assets/PatrocinadoresIMG/logomagdalena.png";
import sponsor7 from "../../assets/PatrocinadoresIMG/logonora.png";
import sponsor8 from "../../assets/PatrocinadoresIMG/logopillos.png";
import sponsor9 from "../../assets/PatrocinadoresIMG/logosubaru.png";

const sponsors = [
  sponsor1,
  sponsor2,
  sponsor3,
  sponsor4,
  sponsor5,
  sponsor6,
  sponsor7,
  sponsor8,
  sponsor9,
];

const Sponsor = () => {
  return (
    <div className="Sponsor">
      <div className="container">
        <span>Nuestros Patrocinadores</span>
        <div className="slider">
          <div className="slide-track">
            {sponsors.concat(sponsors).map((sponsor, index) => (
              <div className="slide" key={index}>
                <img src={sponsor} alt={`Patrocinador ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor;