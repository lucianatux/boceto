//import Carousel from "react-bootstrap/Carousel";
//import secondslide from "../../assets/fotos/slide1.jpg";
//import firstslide from "../../assets/fotos/slide1.jpg";
//import thirdslide from "../../assets/fotos/slide3.jpg";
import { CategoryPage } from "../Cards/CategoryPage";
//import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home">
      <div className="cards-wrapper">
        <CategoryPage category="inicio" />
      </div>
            {/*  
                       <div className="carousel-wrapper">
        <Carousel className="carousel" interval={3000} pause="hover">
          <Carousel.Item>
            <Link to="/videos">
              <img
                className="d-block w-100"
                src={firstslide}
                alt="Videos slide"
                loading="eager"
              />
            </Link>
            <Carousel.Caption>
              <h3>Videos</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <Link to="/libros">
              <img
                className="d-block w-100"
                src={secondslide}
                alt="Libros slide"
                loading="eager"
              />
            </Link>
            <Carousel.Caption>
              <h3>Libros</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <Link to="/comunidad">
              <img
                className="d-block w-100"
                src={thirdslide}
                alt="Preguntas y respuestas slide"
                loading="eager"
              />
            </Link>
            <Carousel.Caption>
              <h3>Preguntas y respuestas</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
                  */}
    </div>
  );
};
