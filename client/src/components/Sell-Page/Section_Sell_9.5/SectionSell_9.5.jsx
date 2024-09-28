import React from 'react';
import './Style.css';
import GoldScrab from "../../../assets/sellpage/GOLD-SCRAP.png";
import "./responsive.css";

const SectionSell_9_5 = ({ onSellNowClick }) => {
    return (
        <>
            <div className="sell-gold-bg"></div>
            <section className='sell-sec-gold-main'>
                <div className='sell-sec-gold'>
                    <div className='sell-sec-gold-content'>
                        <h2>Sell Gold with Gold Mint</h2>
                        <p>
                            Start your Gold investment journey today. Sell your Gold items with ease and get a competitive price.
                        </p>
                        <div>
                            <button onClick={onSellNowClick}>Sell Gold Now</button>
                        </div>
                    </div>
                    <div className='sell-sec-gold-img'>
                        <img src={GoldScrab} alt="Gold Scrap" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default SectionSell_9_5;
