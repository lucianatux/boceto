import facebookIcon from "../../assets/nav-icon4.svg";
import youtubeIcon from "../../assets/nav-icon5.svg";
import logo from "../../assets/logo.png";
import { Container} from 'react-bootstrap';


export const Footer = () => {
  return (
    <div className="footer d-flex justify-content-between align-items-center">

       
        

    <Container fluid>
      <div className="d-flex justify-content-evenly align-items-center flex-wrap">
        <div className="grouped-items">
        <h3>Título</h3>
       <img className="logo" src={logo} alt="" />
       <p>Lorem ipsum dolor sit amet</p>
        </div>
        <div className="social-icon d-flex justify-content-center align-items-center flex-wrap">
            <a
              href="https://www.youtube.com/@elojocuantico-espaciocreat4572"
              target="_blank"
              rel="noreferrer"
            >
              <img src={youtubeIcon} alt="youtube-icon" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100079068583763"
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebookIcon} alt="facebook-icon" />
            </a>
          </div>
        
      </div>
    </Container>
    </div>
  );
};
