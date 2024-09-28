import React from 'react';
import Image2 from "../../assets/refinary/1.jpg";
import Image1 from "../../assets/refinary/2.jpg";
import Image3 from "../../assets/refinary/3.jpg";
import Image4 from "../../assets/refinary/4.jpg";
import './style.css';
import "./responsive.css"

const Refinary_page = () => {
    return (
        <div className="refinary-page">
            <div className="refinary-banner">
                <h1>Advanced Gold Refining</h1>
            </div>
            <div className="refinary-content-wrapper">
                <div className="refinary-content">
                    <div className="refinary-content-top">
                        <p>Gold Mint is a leading gold refiner, committed to excellence and innovation. Our state-of-the-art refinery processes precious metals with precision and care. We are accredited by top industry bodies, ensuring the highest quality standards.</p>
                    </div>
                    <div className="refinary-content-bottom">
                        <div className="refinary-content-1">
                            <div className="refinary-content-1-left">
                                <img src={Image1} alt="State-of-the-art refining facility" />
                            </div>
                            <div className="refinary-content-1-right">
                                <h2>World-Class Refining Capabilities</h2>
                                <p>Gold Mint operates a cutting-edge refinery, processing a wide range of precious metals. Our expertise and advanced technology ensure maximum recovery and purity.</p>
                            </div>
                        </div>
                        <div className="refinary-content-2">
                            <div className="refinary-content-2-left">
                                <h2>Refining Process Expertise</h2>
                                <p>Our refining process is meticulously designed to extract precious metals efficiently and responsibly. We handle various materials, including doré, recycled jewelry, and industrial byproducts.</p>
                                <p>We specialize in gold, silver, platinum, and palladium refining, offering comprehensive solutions for your precious metal needs.</p>
                            </div>
                            <div className="refinary-content-2-right">
                                <img src={Image2} alt="Precious metals refining process" />
                            </div>
                        </div>

                        <div className="refinary-content-1">
                            <div className="refinary-content-1-left">
                                <img src={Image3} alt="Assaying and quality control" />
                            </div>
                            <div className="refinary-content-1-right">
                                <h2>Rigorous Quality Control</h2>
                                <p>Our in-house assaying laboratories employ advanced techniques to ensure the highest purity and accuracy in our refining process.</p>
                                <p>We adhere to strict industry standards and are accredited by leading authorities, guaranteeing the quality of our refined metals.</p>
                            </div>
                        </div>

                        <div className="refinary-content-2">
                            <div className="refinary-content-2-left">
                                <h2>Commitment to Sustainability</h2>
                                <p>Gold Mint is dedicated to sustainable and responsible refining practices. We minimize our environmental impact and adhere to ethical sourcing standards.</p>
                            </div>
                            <div className="refinary-content-2-right">
                                <img src={Image4} alt="Sustainable refining practices" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Refinary_page;
