import Carousel from 'react-bootstrap/Carousel';
import forest from '../../assets/forest.jpg';
import lake from '../../assets/lake.jpg';
import mountain from '../../assets/mountain.jpg';


export const Home = () => {
    return (
      <div className="home">
        <div>
          <Carousel fade className='carousel my-5'>
      <Carousel.Item>
      <img
                            className="d-block w-100"
                            src={lake}
                            alt="First slide"
                        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
                            className="d-block w-100"
                            src={forest}
                            alt="First slide"
                        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
                            className="d-block w-100"
                            src={mountain}
                            alt="First slide"
                        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </div>
      </div>
    )
  }