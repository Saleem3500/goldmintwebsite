import React from 'react';
import './Style.css';
import './responsive.css'
import goldcoin from "../../../assets/sellpage/GOLD COIN.png";
import goldscrab from "../../../assets/sellpage/GOLD-SCRAP.png";
import silvercoin from "../../../assets/sellpage/SILVER-COIN.png";
import silverscrab from "../../../assets/sellpage/SILVER_SCRAP.png";

const SectionSell_3 = () => {
    const metals = [
        { type: 'Gold Coins', image: goldcoin },
        { type: 'GOLD Jewelry', image: goldscrab },
        { type: 'silver coins', image: silvercoin },
        { type: 'silver scrap', image: silverscrab }
    ];

    return (
        <section className="sec-3-gold-wrapper">
            <div className="sec-3-gold">
                <div className="sec-3-gold-content">
                    <h2>Sell Your Precious Metals to Gold Mint</h2>
                    <p>At Gold Mint, we're the UK's leading buyer of precious metals.
                        Sell gold, silver, platinum, and palladium through our secure online
                        platform or visit us in person. We offer clear pricing with no hidden
                        charges, and you can track your sale conveniently online in real-time.</p>
                </div>
                <div className="sec-3-sell-cards">
                    {metals.map((metal) => (
                        <div className="sec-3-sell-card" key={metal.type}>
                            <div className="sec-3-sell-card-img">
                                <img src={metal.image} alt={`Sell ${metal.type}`} />
                            </div>
                            <div className="card-title-sec-3-gold">
                                {metal.type}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SectionSell_3;
