import React from 'react';
import './Style.css';
import "./responsive.css";
import guranted from '../../../assets/sellpage/guaranteed-prices-seal.svg';

const SectionSell_7 = ({ onSellNowClick }) => {
    return (
        <section className="sell-sec-7-main">
            <div className="sell-sec-7">
                <div className="sell-sec-7-img">
                    <img src={guranted} alt="Gold Mint Price Guarantee" />
                </div>
                <div className="sell-sec-7-content">
                    <h2>Price Guarantee at Gold Mint</h2>
                    <p>We stand by our word at Gold Mint. Our quoted price will be superior then our compatitors guarenteed.</p>
                    <div>
                        <button onClick={onSellNowClick}>Sell Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionSell_7;
