import React from 'react'
import DesktopImage from "../../../assets/sell-gold-laptop.png"
import "./style.css"
import "./responsive.css"

const MainPageSellGold = () => {
    return (
        <>
            <div className="mp-selling-gold">
                <div className="selling-gold-main d-flex">
                    <div className="selling-gold-left">
                        <img src={DesktopImage} alt="" />
                    </div>

                    <div className="selling-gold-right">
                        <span>Sell your Gold and Silver Fast</span>
                        <h1>Quick Cash for Gold and Silver</h1>
                        <ul>
                            <li><a href="">Free Instant Valuation</a></li>
                            <li><a href="">Convenient Material Collection</a></li>
                            <li><a href="">Get Paid Instantly</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mp-selling-cards">
                    <div className="mp-selling-card">
                        <h2>£100m</h2>
                        <p>Gold Purchased</p>
                    </div>
                    <div className="mp-selling-card">
                        <h2>101k</h2>
                        <p>Satisfied Clients</p>
                    </div>
                    <div className="mp-selling-card">
                        <h2>3 mins</h2>
                        <p>Rapid Transaction</p>
                    </div>

                </div>
            </div>
            <div className="mp-sell-gold-bg"></div>
        </>
    )
}

export default MainPageSellGold
