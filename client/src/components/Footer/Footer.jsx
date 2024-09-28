import React from 'react';
import footerImg from '../../assets/nav-logo.png';
import recog1 from '../../assets/footer/recog-1.png';
import recog2 from '../../assets/footer/best-business-award (1).svg';
import trustpilot from '../../assets/footer/trustpilot-logo (1).png';
import checkout from '../../assets/footer/checkout-logos.png';
import member1 from '../../assets/footer/ipmi-logo.png';
import member2 from '../../assets/footer/lloyds-logo.png';
import member3 from '../../assets/footer/made-in-britain-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import privacy from "../../assets/Privacy Policy.pdf";
import terms from "../../assets/Terms and Conditions.pdf";
import './style.css';
import "./responsive.css";

const Footer = () => {
    return (
        <section className="footer-main">
            <div className="footer">
                <div className="footer-logo">
                    <img src={footerImg} alt="Footer-img" />
                </div>
                <div className="footer-sec-2">
                    <div className="footer-items">
                        <div className="footer-item">
                            <h3>Buying</h3>
                            <Link to="/buy">Minted Gold Bar</Link>
                            <Link to="/buy">Casted Gold Bar</Link>
                            <Link to="/buy">Gold Coins</Link>
                            <Link to="/buy">Silver Coins</Link>
                            <Link to="/buy">Accessories</Link>
                            <Link to="/buy">Gift</Link>
                        </div>
                        <div className="footer-item">
                            <h3>Selling</h3>
                            <Link to="/sellpage">Sell Gold</Link>
                            <Link to="/sellpage">Sell Silver</Link>
                            <Link to="/sellpage">Sell Gold Coin</Link>
                            <Link to="/sellpage">Sell Silver Scrap</Link>
                        </div>
                        <div className="footer-item">
                            <h3>About</h3>
                            <Link to="/aboutus">Our Story</Link>
                            <Link to="/aboutus">Careers</Link>
                            <Link to="/aboutus">Achievements</Link>
                        </div>

                        <div className="footer-item">
                            <h3>Support</h3>
                            <a href="https://wa.me/447429555255" target="_blank" rel="noopener noreferrer">Contact Us</a>
                            <a href={terms} target="_blank" rel="noopener noreferrer">Faqs</a>
                        </div>
                    </div>
                    <div className="footer-visit-us">
                        <div className="visit-us">
                            <h3>Visit Us</h3>
                            <p>
                                94 Waterloo street, Oldham, Greater Manchester OL4 1EQ United Kingdom.
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faEnvelope} /> <span>goldmint@gmail.com</span><br />
                                <FontAwesomeIcon icon={faPhone} /> <span>+44 161 222 5870</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="footer-recognition">
                    <div className="footer-recognition-content">
                        <h3>Recognition</h3>
                        <div className="recog-2-img">
                            <img src={recog1} alt="Award 1" />
                            <img src={recog2} alt="Award 2" />
                        </div>
                    </div>
                    <div className="footer-follow-us">
                        <h3>Follow Us</h3>
                        <div className="footer-icons">
                            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#"><FontAwesomeIcon icon={faEnvelope} /></a>
                            <a href="#"><FontAwesomeIcon icon={faPhone} /></a>
                            <a href="#"><FontAwesomeIcon icon={faWhatsapp} /></a>
                            <a href="#"><FontAwesomeIcon icon={faTelegram} /></a>
                            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                        </div>
                    </div>
                </div>

                <div className="feedback-sec-3">
                    <div className="footer-feedback">
                        <h3>Feedback</h3>
                        <img src={trustpilot} alt="Trustpilot" />
                    </div>
                    <div className="footer-feedback">
                        <h3>Secure Checkouts</h3>
                        <img src={checkout} alt="Secure 1" />
                    </div>
                    <div className="footer-proud-members">
                        <h3>Proud Members</h3>
                        <div className="Footer-members">
                            <img src={member1} alt="Member 1" />
                            <img src={member2} alt="Member 2" />
                            <img src={member3} alt="Member 3" />
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2024 Gold Mint, All rights reserved.</p>
                    <p>
                        <a href={privacy} target="_blank" rel="noopener noreferrer">Privacy Policy</a> •
                        <a href={terms} target="_blank" rel="noopener noreferrer">Terms & Conditions</a> •
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Footer;
