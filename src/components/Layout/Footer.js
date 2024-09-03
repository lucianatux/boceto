import facebookIcon from "../../assets/nav-icon4.svg";
import youtubeIcon from "../../assets/nav-icon5.svg";
import logo from '../../assets/logo.png';


export const Footer = () => {
  return (
    <div className="footer d-flex justify-content-center align-items-center">
        <h3>Título</h3>
      <img className='logo mx-4' src={logo} alt=""/>
<p>Lorem ipsum dolor sit amet
</p>
      <div className="row mx-2 text-center">
        <div className="col-sm-auto p-3">
          <div className="social-icon">
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
      </div>
    </div>
  );
};
