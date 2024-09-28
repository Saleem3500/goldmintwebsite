import React from 'react';
import './Style.css';
import SilverScrab from '../../../assets/sellpage/SILVER_SCRAP.png';
import "./responsive.css"

const SectionSell_9 = ({ onSellNowClick }) => {
    return (
        <>
            <div className="sell-9-bg"></div>
            <section className='sell-sec-9-main'>
                <div className='sell-sec-9'>
                    <div className='sell-sec-9-content'>
                        <h2>Sell Silver with Gold Mint</h2>
                        <p>
                            Start your silver investment journey today. Sell your silver items with ease and get a competitive price.
                        </p>
                        <div>
                            <button onClick={onSellNowClick}>Sell Silver Now</button>
                        </div>
                    </div>
                    <div className='sell-sec-9-img'>
                        <img src={SilverScrab} alt="sell silver" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default SectionSell_9;
