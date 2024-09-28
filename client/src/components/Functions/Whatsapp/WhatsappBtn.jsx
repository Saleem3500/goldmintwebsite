import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './style.css';

const WhatsappBtn = () => {
    return (
        <div className="contact-btns">
            <div className="whatsapp-wrapper">
                <a
                    href="whatsapp://send?phone=+447429555255"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn whatsapp-btn"
                >
                    <FontAwesomeIcon icon={faWhatsapp} />
                </a>
            </div>
        </div>
    );
}

export default WhatsappBtn;
