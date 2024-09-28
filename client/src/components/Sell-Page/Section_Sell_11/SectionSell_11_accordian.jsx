import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Style.css';
import "./responsive.css"

const SectionSell_11_accordian = () => {
  const faqs = [
    {
      question: 'How can I sell my gold to Gold Mint?',
      answer: 'You can sell your gold to Gold Mint by visiting one of our branches, using our online platform, or scheduling a home collection.'
    },
    {
      question: 'What types of gold do you buy?',
      answer: 'Gold Mint purchases a wide range of gold items, including coins, bars, jewellery (broken or whole), and scrap gold.'
    },
    {
      question: 'How do I get a quote for my gold?',
      answer: 'You can get a free online valuation or visit one of our branches for an in-person assessment.'
    },
    {
      question: 'Is there a minimum amount of gold I need to sell?',
      answer: 'No, there is no minimum amount of gold required to sell at Gold Mint.'
    },
    {
      question: 'How do you determine the value of my gold?',
      answer: 'Our experts assess the purity, weight, and current market value of your gold to determine a fair price.'
    },
    {
      question: 'Do you buy gold plated items?',
      answer: 'No, we only buy items with a significant gold content.'
    },
    {
      question: 'Is my gold safe when I sell it to you?',
      answer: 'Absolutely. We prioritize the security of your items throughout the selling process.'
    },
    {
      question: 'What forms of payment do you offer?',
      answer: 'We offer various payment options, including cash, bank transfer, and check.'
    },
    {
      question: 'How long does the selling process take?',
      answer: 'The process is usually quick. For in-store sales, you can receive payment on the same day. For online sales, it may take a few business days.'
    },
    {
      question: 'Do I need an appointment to sell my gold?',
      answer: 'While appointments are recommended for larger quantities, walk-ins are welcome.'
    },
    {
      question: 'What identification do I need to sell gold?',
      answer: 'You will need to provide valid government-issued identification to complete the sale.'
    },
    {
      question: 'Can I sell gold on behalf of someone else?',
      answer: 'Yes, but you will need to provide authorization from the owner.'
    },
    {
      question: 'Do you offer a price guarantee?',
      answer: 'Yes, we offer a price guarantee for a specified period to ensure you get the best possible price.'
    },
    {
      question: 'What happens if I am not satisfied with the valuation?',
      answer: 'If you are unhappy with the valuation, you can decline the offer and retrieve your items.'
    },
    {
      question: 'Can I sell broken or damaged gold items?',
      answer: 'Yes, we accept broken or damaged gold items for valuation.'
    },
    {
      question: 'Do you buy gold jewellery with gemstones?',
      answer: 'Yes, we buy gold jewellery with gemstones. The value of the gemstones will be assessed separately.'
    },
    {
      question: 'How do I ship my gold to you?',
      answer: 'We provide secure packaging for shipping your gold. Please contact us for shipping instructions.'
    },
    {
      question: 'Is there insurance coverage for the gold during shipping?',
      answer: 'We recommend insuring the package when shipping your gold to us.'
    }
  ];
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='sec-11-accordin'>
      <div className="accordian-wrapper">
        <div className="accordion-container">
          <h1>Faqs</h1>
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <div className="accordion-title" onClick={() => toggleAccordion(index)}>
                {faq.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div className={`accordion-content ${openIndex === index ? 'open' : ''}`}>
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionSell_11_accordian;
