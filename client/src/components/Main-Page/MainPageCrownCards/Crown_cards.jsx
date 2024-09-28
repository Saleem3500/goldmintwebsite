import React, { useState } from 'react';
import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BronzeImage from "../../../assets/crowns/BRONZE.png";
import SilverImage from "../../../assets/crowns/SILVER.png";
import PlatiniumImage from "../../../assets/crowns/PLANTANIUM.png";
import GoldImage from "../../../assets/crowns/GOLD-CROWN.png";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import "./responsive.css"

const CrownCards = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
    };

    const backgrounds = [
        { background: 'radial-gradient(circle, rgba(205,127,50,1) 0%, rgba(139,69,19,1) 100%)' }, //bronze
        { background: 'radial-gradient(circle, rgba(192,192,192,1) 0%, rgba(128,128,128,1) 100%)' }, //silver
        { background: 'radial-gradient(circle, rgba(229,228,226,1) 0%, rgba(128,128,128,1) 50%, rgba(0,0,0,1) 100%)' },
        //platinum
        { background: 'radial-gradient(circle, rgba(166,124,0,1) 100%, rgba(225,225,225,0.7) 0%)' } // golden
    ];

    const cards = [
        {
            heading: 'Bronze Membership',
            description: 'Start Your Investment Journey',
            upto: "7,500",
            earn: "1X",
            image: BronzeImage,
            background: backgrounds[0].background,
        },
        {
            heading: 'Silver Membership',
            description: 'Accelerate Your Investment Growth',
            upto: "55,000",
            earn: "2X",
            image: SilverImage,
            background: backgrounds[1].background,
        },
        {
            heading: 'Platinum Membership',
            description: 'Experience Premium Investment Benefits',
            upto: "250,000",
            earn: "3X",
            image: PlatiniumImage,
            background: backgrounds[2].background,
        },
        {
            heading: 'Gold Membership',
            description: 'Unlock Exclusive Investment Privileges',
            upto: "1M",
            earn: "4X",
            image: GoldImage,
            background: backgrounds[3].background,
        },
    ];


    return (
        <div className="crown-main-wrapper">

            <Container>
                <div className="carousel-container">
                    <h2>Join our exclusive membership program today!</h2>
                    <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} controls={false}>
                        {cards.map((card, idx) => (
                            <Carousel.Item key={idx}>
                                <Row className="justify-content-center">
                                    <Col lg={12}>
                                        <Card className="mx-auto" style={{ background: card.background }}>
                                            <Card.Body>
                                                <div className="crown-image">
                                                    <img src={card.image} alt="" />
                                                </div>
                                                <div className="crown-content">
                                                    <h2>{card.heading}</h2>
                                                    <p>{card.description}</p>
                                                    <div className="crown-card-points">
                                                        <div className="crown-card-point">
                                                            <h4>Up to <span>{card.upto}</span> Points</h4>
                                                        </div>
                                                        <div className="crown-card-point">
                                                            <h4>Up to <span>{card.earn}</span> Points</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className="carousel-controls">
                        <button onClick={handlePrev}><FaArrowLeft size={30} /></button>
                        <button onClick={handleNext}><FaArrowRight size={30} /></button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CrownCards;
