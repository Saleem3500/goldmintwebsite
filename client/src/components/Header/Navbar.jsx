// src/components/NavbarComponent.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser, FaShoppingCart } from 'react-icons/fa';

import Logo from "../../assets/nav-logo.png";
import gbpFlag from '../../assets/gbp-flag.png';
import eurFlag from '../../assets/eur-flag.png';
import usdFlag from '../../assets/usd-flag.png';

import { CurrencyContext } from '../Global State/CurrencyContext';
import MetalRatesComponent from '../Live Rates/MetalRatesComponent';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const NavbarComponent = () => {
    const { selectedCurrency, setSelectedCurrency } = useContext(CurrencyContext); // Use the context
    const [showDigitalDropdown, setShowDigitalDropdown] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleDigitalDropdownToggle = () => setShowDigitalDropdown(!showDigitalDropdown);

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
        setExpanded(false);  // Close the navbar
    };

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency); // Update the currency globally
    };

    return (
        <>
            <Navbar variant="dark" expand="lg" className="navbar" expanded={expanded}>
                <Container>
                    <Navbar.Brand as={Link} to="/" onClick={handleLinkClick} className="d-flex align-items-center">
                        <div className="logo-container">
                            <img src={Logo} className="nav-logo" alt="BRIT Logo" />
                            <div className="glow-line"></div>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-lg-center">
                            <NavDropdown
                                title="BUY"
                                id="digital-marketing-dropdown"
                                className="dropdown"
                                show={showDigitalDropdown}
                                onMouseEnter={() => setShowDigitalDropdown(true)}
                                onMouseLeave={() => setShowDigitalDropdown(false)}
                                onClick={handleDigitalDropdownToggle}
                            >
                                <NavDropdown.Item as={Link} to="/buy" onClick={handleLinkClick}>Minted Gold Bar</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/buy" onClick={handleLinkClick}>Casted Gold Bar</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/buy" onClick={handleLinkClick}>Gold Coins</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/buy" onClick={handleLinkClick}>Silver Coins</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/buy" onClick={handleLinkClick}>Accessories</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/buy" onClick={handleLinkClick}>Gifts</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/sellpage" onClick={handleLinkClick}>SELL</Nav.Link>
                            <Nav.Link as={Link} to="/refinary" onClick={handleLinkClick}>REFINERY</Nav.Link>
                            <Nav.Link as={Link} to="/aboutus" onClick={handleLinkClick}>ABOUT US</Nav.Link>
                            <NavDropdown
                                title={<><img src={selectedCurrency.flag} alt={selectedCurrency.name} className="flag-icon" /> {selectedCurrency.name}</>}
                                id="currency-dropdown"
                            >
                                <NavDropdown.Item onClick={() => handleCurrencyChange({ name: "GBP", flag: gbpFlag, code: "GBP" })}>
                                    <img src={gbpFlag} alt="GBP" className="flag-icon" /> GBP
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleCurrencyChange({ name: "EUR", flag: eurFlag, code: "EUR" })}>
                                    <img src={eurFlag} alt="EUR" className="flag-icon" /> EUR
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleCurrencyChange({ name: "USD", flag: usdFlag, code: "USD" })}>
                                    <img src={usdFlag} alt="USD" className="flag-icon" /> USD
                                </NavDropdown.Item>
                            </NavDropdown>
                            <div className="admin-cart">
                                <Nav.Link as={Link} to="/cart" onClick={handleLinkClick}><FaShoppingCart /></Nav.Link>
                                <Nav.Link as={Link} to="/admin" onClick={handleLinkClick}><FaUser /></Nav.Link>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <MetalRatesComponent />
        </>
    );
}

export default NavbarComponent;
