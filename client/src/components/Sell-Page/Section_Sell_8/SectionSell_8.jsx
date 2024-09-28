import React from 'react';
import './Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faBars, faGem, faScrewdriverWrench, faTooth, faClock, faBan, faLaptop, faSpoon } from '@fortawesome/free-solid-svg-icons';
import "./responsive.css"

const SectionSell_8 = () => {
    return (
        <section className="sell-sec-8">
            <div className="sell-sec-8-container">
                <h2>What We Buy</h2>
                <p>Sell your gold and other precious items with ease at Gold Mint.</p>
                <div className="sell-sec-8-buy">
                    <h2>We Buy</h2>
                    <div className="sell-sec-8-items">
                        <div className="sell-sec-8-item">
                            <FontAwesomeIcon icon={faCoins} />
                            <p>Gold Coins</p>
                        </div>
                        <div className="sell-sec-8-item">
                            <FontAwesomeIcon icon={faBars} />
                            <p>Gold Bars</p>
                        </div>
                        <div className="sell-sec-8-item">
                            <FontAwesomeIcon icon={faGem} />
                            <p>Gold Jewellery</p>
                        </div>
                        <div className="sell-sec-8-item">
                            <FontAwesomeIcon icon={faScrewdriverWrench} />
                            <p>Broken Jewellery</p>
                        </div>
                        <div className="sell-sec-8-item">
                            <FontAwesomeIcon icon={faTooth} />
                            <p>Dental Gold</p>
                        </div>
                        <div className="sell-sec-8-item">
                            <FontAwesomeIcon icon={faClock} />
                            <p>Gold Watches</p>
                        </div>
                    </div>
                </div>
                <div className="sell-sec-8-dont-buy">
                    <h2>We Don't Buy</h2>
                    <div className="sell-sec-8-items">
                        <div className="sell-sec-8-item">
                            <FontAwesomeIcon icon={faScrewdriverWrench} />
                            <p>Rolled Gold</p>
                        </div>
                        <div className="sell-sec-8-item">
                            <FontAwesomeIcon icon={faBan} />
                            <p>Gold Foiling</p>
                        </div>
                        <div className="sell-sec-8-item">
                            <FontAwesomeIcon icon={faLaptop} />
                            <p>Electronics</p>
                        </div>
                        <div className="sell-sec-8-item">
                            <FontAwesomeIcon icon={faSpoon} />
                            <p>Plated Gold</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionSell_8;
