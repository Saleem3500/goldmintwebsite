import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faMedal, faStar } from '@fortawesome/free-solid-svg-icons';
import Video from "../../../assets/goldbank-video.mp4"
const Main_sec_1_cards = () => {
    return (
        <section id="sec-1-cards-main">
            <h2>"Superior Price Guarenteed"</h2>
            <div className="sec-1-cards">
                <div className="sec-1-card">
                    <div className="sec-1-icon">
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </div>
                    <div className="sec-1-card-content">
                        <h3>PRICE GUARANTEE</h3>
                        <p>Secure your gold investment with our price guarantee.</p>
                    </div>
                </div>
                <div className="sec-1-card">
                    <div className="sec-1-icon">
                        <FontAwesomeIcon icon={faMedal} />
                    </div>
                    <div className="sec-1-card-content">
                        <h3>MEMBERSHIP REWARDS</h3>
                        <p>Earn points on both gold purchases and sales</p>
                    </div>
                </div>
                <div className="sec-1-card">
                    <div className="sec-1-icon">
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    <div className="sec-1-card-content">
                        <h3>5 STAR REVIEWS</h3>
                        <p>We are rated excellent on Trustpilot
                        Read Our Trustpilot Reviews</p>
                    </div>
                </div>
            </div>
            <div className="video-container">
                <video
                    src={Video}
                    autoPlay
                    controls
                    loop
                    muted
                    className="main-video"
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    );
}

export default Main_sec_1_cards;