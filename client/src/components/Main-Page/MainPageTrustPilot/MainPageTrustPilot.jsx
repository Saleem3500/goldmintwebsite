import React from 'react'
import TrustPilotImg from "../../../assets/trustpilot.png"
import TrustPilotMobile from "../../../assets/trustpilotmobile.png"
import "./style.css"
import "./responsive.css"

const MainPageTrustPilot = () => {
    return (
        <div className="trust-pilot-main">
            <div className="trust-pilot-top">
                <span>Customer Trust</span>
                <h1>Trusted by Thousands</h1>
                <img src={TrustPilotImg} alt="Trust Pilot Image" /><span></span>
                <h4>Excellent</h4>
                <p>Based on 784 verified reviews</p>
            </div>

            <div className="trust-pilot-sections">
                <div className="trust-pilot-section">
                    <div className="trust-pilot-card">
                        <h2>100,000+</h2>
                        <p> Happy Customers</p>
                    </div>
                    <div className="trust-pilot-card">
                        <h2>150,000+</h2>
                        <p>Orders Delivered</p>
                    </div>
                </div>
                <div className="trust-pilot-section-2">
                    <img src={TrustPilotMobile} alt="" />
                </div>
                <div className="trust-pilot-section">
                    <div className="trust-pilot-card">
                        <h2>99.95%</h2>
                        <p>Order Fulfillment</p>
                    </div>
                    <div className="trust-pilot-card">
                        <h2>20 Tons+</h2>
                        <p>Gold Purchased</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPageTrustPilot
