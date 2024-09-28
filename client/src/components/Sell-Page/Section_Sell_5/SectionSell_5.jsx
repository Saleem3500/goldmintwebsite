import React from 'react';
import './Style.css';
import "./responsive.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faShieldAlt, faDollarSign, faStar } from '@fortawesome/free-solid-svg-icons';

const Section_Sell_5 = () => {
    return (
        <section className="sell-sec-5-main">
            <div className="sell-section-5">
                <h2>Why Choose Us to Sell Your Gold?</h2>
                <p>With over 30 years of experience, we offer a seamless and rewarding selling process.</p>
                <div className="sell-sec-5-features">
                    <div className="sell-sec-5-feature">
                        <FontAwesomeIcon icon={faTruck} className="sell-sec-5-icon" />
                        <h3>Quick Collection</h3>
                        <p>Hassle-free collection right from your doorstep.</p>
                    </div>
                    <div className="sell-sec-5-feature">
                        <FontAwesomeIcon icon={faShieldAlt} className="sell-sec-5-icon" />
                        <h3>Secure Transactions</h3>
                        <p>Your security is our top priority.</p>
                    </div>
                    <div className="sell-sec-5-feature">
                        <FontAwesomeIcon icon={faDollarSign} className="sell-sec-5-icon" />
                        <h3>Competitive Prices</h3>
                        <p>Get the best value for your gold guarenteed.</p>
                    </div>
                    <div className="sell-sec-5-feature">
                        <FontAwesomeIcon icon={faStar} className="sell-sec-5-icon" />
                        <h3>Exceptional Service</h3>
                        <p>Experience our outstanding customer support.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section_Sell_5;
