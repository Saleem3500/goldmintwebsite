import React from 'react';
import './Style.css';
import "./responsive.css"

const SectionSell_10 = () => {
    const content = [
        { type: 'title', text: 'Sell Your Precious Metals with Gold Mint' },
        { type: 'subtitle', text: 'Get the Best Price for Your Gold' },
        { type: 'text', text: 'At Gold Mint, we offer a seamless and secure platform to sell your gold. Whether you have gold coins, bars, or jewellery, we provide competitive prices and a hassle-free experience.' },
        { type: 'heading', text: 'Our Commitment' },
        { type: 'text', text: 'Highest Prices Guaranteed' },
        { type: 'text', text: 'We constantly monitor the gold market to ensure you receive the best possible price for your gold. Our transparent pricing system guarantees no hidden fees.' },
        { type: 'text', text: 'Secure and Insured Transactions' },
        { type: 'text', text: 'Your security is our top priority. We handle your gold with care and provide insurance coverage throughout the selling process.' },
        { type: 'heading', text: 'What We Buy' },
        { type: 'text', text: 'We accept a wide range of gold items, including:' },
        {
            type: 'list', text: [
                'Gold Coins: Sovereigns, Krugerrands, and more',
                'Gold Bars: Various sizes and purities',
                'Gold Jewellery: Rings, necklaces, bracelets, and earrings',
                'Scrap Gold: Broken jewellery and dental gold',
            ]
        },
        { type: 'heading', text: 'How It Works' },
        { type: 'text', text: '1. Get a Free Online Valuation' },
        { type: 'text', text: 'Enter your gold items for an instant, no-obligation valuation.' },
        { type: 'text', text: '2. Send Your Gold' },
        { type: 'text', text: 'Securely pack and ship your gold to our facility, or visit one of our branches.' },
        { type: 'text', text: '3. Receive Your Payment' },
        { type: 'text', text: 'Get paid quickly via bank transfer or cash.' },
        { type: 'heading', text: 'Why Choose Gold Mint?' },
        { type: 'text', text: 'Experience, Trust, and Reliability' },
        { type: 'text', text: 'With years of experience in the gold industry, we have built a reputation for trust and reliability. Our commitment to customer satisfaction is unmatched.' },
    ];

    return (
        <section className='sell-sec-10-main'>
        <div className="sell-sec-10">
            {content.map((item, index) => {
                switch (item.type) {
                    case 'title':
                        return <h2 key={index} className='sell-sec-10-title'>{item.text}</h2>;
                    case 'subtitle':
                        return <p key={index} className='sell-sec-10-subtitle'>{item.text}</p>;
                    case 'heading':
                        return <h3 key={index} className='sell-sec-10-heading'>{item.text}</h3>;
                    case 'text':
                        return <p key={index} className='sell-sec-10-text'>{item.text}</p>;
                    case 'list':
                        return (
                            <ul key={index} className='sell-sec-10-list'>
                                {item.text.map((listItem, listIndex) => (
                                    <li key={listIndex}>{listItem}</li>
                                ))}
                            </ul>
                        );
                    default:
                        return null;
                }
            })}
        </div>
        </section>
    );
};

export default SectionSell_10;
