import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import IslamicCollectionImage from "../../../assets/Banner Images/islamic.webp";
import WorldMonumentImage from "../../../assets/Banner Images/world monument.webp";
import WorldHistoricImage from "../../../assets/Banner Images/world historic.webp";
import SevenWonderzImage from "../../../assets/Banner Images/7 wonderz.jpg";
import AncientImage from "../../../assets/Banner Images/ancient.webp";
import ArabianImage from "../../../assets/Banner Images/arabian.webp";
import HistoricGoldCoin from "../../../assets/Banner Images/historic gold coin.webp";
import BritishImage from "../../../assets/Banner Images/british.webp";
import DragonImage from "../../../assets/Banner Images/dragon collection.webp";

import "./style.css";
import "./responsive.css";

function MainPageCarousel() {
  return (
    <>
      <div className="carousel-title">
        <h1>Discover Our Gold Collection</h1>
      </div>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={IslamicCollectionImage}
            alt="First slide"
          />
          <div className="carousel-content">
            <h1>Islamic Collection</h1>
            <p>Discover our Islamic Minted coins collection.</p>
            <Link to="/buy">Explore Our Collection</Link> {/* Use Link instead of a */}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={WorldMonumentImage}
            alt="Second slide"
          />
          <div className="carousel-content">
            <h1>World Monument Collection</h1>
            <p>Discover iconic world landmarks stuningly minted on our Gold and Silver coins.</p>
            <Link to="/buy">Explore Our Collection</Link> {/* Use Link instead of a */}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={WorldHistoricImage}
            alt="Third slide"
          />
          <div className="carousel-content">
            <h1>World Historic Collection</h1>
            <p>Immerse yourself in history with our curated collection of world landmarks.</p>
            <Link to="/buy">Explore Our Collection</Link> {/* Use Link instead of a */}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={SevenWonderzImage}
            alt="Third slide"
          />
          <div className="carousel-content">
            <h1>Seven Wonderz Collection</h1>
            <p>Discover our seven wonderz of the world collection minted on Gold and Silver coin with precision.</p>
            <Link to="/buy">Explore Our Collection</Link> {/* Use Link instead of a */}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={AncientImage}
            alt="Third slide"
          />
          <div className="carousel-content">
            <h1>Ancient Collection</h1>
            <p>Unveil the mysteries of the past with our ancient collection.</p>
            <Link to="/buy">Explore Our Collection</Link> {/* Use Link instead of a */}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={ArabianImage}
            alt="Third slide"
          />
          <div className="carousel-content">
            <h1>Arabian Collection</h1>
            <p>Indulge in the opulence of the Arabian world with our exquisite collection.</p>
            <Link to="/buy">Explore Our Collection</Link> {/* Use Link instead of a */}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={HistoricGoldCoin}
            alt="Third slide"
          />
          <div className="carousel-content">
            <h1>Historic Coin Collection</h1>
            <p>Journey through time with our exquisite historic collection.</p>
            <Link to="/buy">Explore Our Collection</Link> {/* Use Link instead of a */}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={BritishImage}
            alt="Third slide"
          />
          <div className="carousel-content">
            <h1>British Collection</h1>
            <p>Explore almost all the famous minted coins from the GOLD MINT Collection.</p>
            <Link to="/buy">Explore Our Collection</Link> {/* Use Link instead of a */}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={DragonImage}
            alt="Third slide"
          />
          <div className="carousel-content">
            <h1>Dragon Collection</h1>
            <p>Unleash the power of myth with our legendary dragon collection.</p>
            <Link to="/buy">Explore Our Collection</Link> {/* Use Link instead of a */}
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default MainPageCarousel;
