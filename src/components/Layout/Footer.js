import tiktokIcon from "../../assets/iconos/nav-icon1.svg";
import instagramIcon from "../../assets/iconos/nav-icon3.svg";
import youtubeIcon from "../../assets/iconos/nav-icon5.svg";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer d-flex justify-content-center align-items-center footer-content">
      <Container fluid>
        <div className="d-flex justify-content-evenly align-items-center flex-wrap">
          <div className="grouped-items d-flex flex-column">
            <p className="title-first-letter">
              V<span className="title-rest-word">EDANTA</span> E
              <span className="title-rest-word">N</span> E
              <span className="title-rest-word">SPAÑOL</span>
            </p>
            <div className="text-footer">
              <Link to="/login" className="secret-btn">
                <div>Copyright © 2025 Vedanta En Español</div>
              </Link>
            </div>
          </div>
          <div className="social-icon d-flex justify-content-center align-items-center flex-wrap">
            <a
              href="https://www.youtube.com/@caminosdelvedanta"
              target="_blank"
              rel="noreferrer"
            >
              <img src={youtubeIcon} alt="youtube-icon" />
            </a>
            <a
              href="https://www.instagram.com/vedantaenespanol/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagramIcon} alt="instagram-icon" />
            </a>
            <a
              href="https://www.tiktok.com/@caminosvedanta?lang=es-419"
              target="_blank"
              rel="noreferrer"
            >
              <img src={tiktokIcon} alt="tiktok-icon" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};
