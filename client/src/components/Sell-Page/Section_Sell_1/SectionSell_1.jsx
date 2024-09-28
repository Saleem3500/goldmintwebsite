import React from 'react';
import gold_silver from '../../../assets/sell-gold-laptop.png';
import './Style.css';
import './responsive.css';

const Section_Sell_1 = ({ onSellNowClick }) => {
    return (
        <section className="sell-1-main">
            <div className="sell-1-wrapper">
                <div className="sell-sec_1_content">
                    <h1>Sell Your Gold Fast in UK</h1>
                    <p>Quick and Easy Cash for Your Precious Metals</p>
                    <div>
                        <button onClick={onSellNowClick}>Sell Now</button>
                    </div>
                </div>
                <div className="sell-1-img">
                    <img src={gold_silver} alt="gold and silver" />
                </div>
            </div>
        </section>
    );
};

export default Section_Sell_1;
