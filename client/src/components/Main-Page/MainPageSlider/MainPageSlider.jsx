import React, { useEffect, useState } from 'react';
import Main_logo from "../../../assets/website-logo.png"
import Gold_Slider from "../../../assets/Slider Images/slider-gold-plate.png"
import Silver_Slider from "../../../assets/Slider Images/slider-silver-plate.png"
import PlatiniumSlider from "../../../assets/Slider Images/slider-platinium-plate.png"
import PladiniumSlider from "../../../assets/Slider Images/slider-pladinium-plate.png"
import "./style.css"
import "./responsive.css"

const MainPageSlider = () => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(updateSlider, 3000);
    return () => clearInterval(interval);
  }, [imageIndex]);

  const images = [
    Gold_Slider,
    Silver_Slider,
    PlatiniumSlider,
    PladiniumSlider
  ];

  const backgrounds = [
    { background: 'radial-gradient(circle, rgba(166,124,0,1) 0%, rgba(0,0,0,1) 100%)' }, // golden
    { background: 'radial-gradient(circle, rgba(192,192,192,1) 0%, rgba(0,0,0,1) 100%)' }, // silver
    { background: 'radial-gradient(circle, rgba(229,228,226,1) 0%, rgba(0,0,0,1) 100%)' }, // platinum
    { background: 'radial-gradient(circle, rgba(229,228,226,1) 0%, rgba(0,0,0,1) 100%)' }  // palladium
  ];


  const updateSlider = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section className="slider-main">
      <div className="slider-container">
        <div className="logo">
          <a href="#"><img src={Main_logo} alt="logo" /></a>
        </div>
        <div className="slider-content-wrap">
          <div className="slider-content">
          <h2 className="heading-style-2">Gold Mint</h2>
          <p>Looking to invest in gold? You've come to the right place. Gold Mint offers a wide range of options to suit every need. Buy now and join our community of investors.</p>
          </div>
        </div>
      </div>
      <div className="slider-images">
        {images.map((src, index) => (
          <img
            key={index}
            className={`slider-image ${index === imageIndex
              ? 'active'
              : index === (imageIndex - 1 + images.length) % images.length
                ? 'previous'
                : index === (imageIndex + 1) % images.length
                  ? 'next'
                  : 'inactive'
              }`}
            src={src}
            alt="headphone image"
          />
        ))}
      </div>
      <div id="backgrounds">
        {backgrounds.map((style, index) => (
          <div
            key={index}
            className="background"
            style={{ ...style, opacity: index === imageIndex ? 1 : 0 }}
          />
        ))}
      </div>
    </section>
  );
};

export default MainPageSlider;