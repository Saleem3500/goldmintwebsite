import React, { useRef } from 'react';
import Section_Sell_1 from '../Section_Sell_1/SectionSell_1';
import SectionSell_3 from '../Section_Sell_3/SectionSell_3';
import Section_Sell_5 from '../Section_Sell_5/SectionSell_5';
import MainPageSellGold from "../../Main-Page/MainPageSellGold/MainPageSellGold";
import SectionSell_7 from '../Section_Sell_7/SectionSell_7';
import SectionSell_8 from '../Section_Sell_8/SectionSell_8';
import SectionSell_9 from '../Section_Sell_9/SectionSell_9';
import SectionSell_9_5 from '../Section_Sell_9.5/SectionSell_9.5';
import SectionSell_10 from '../Section_Sell_10/SectionSell_10';
import SectionSell_11_accordian from '../Section_Sell_11/SectionSell_11_accordian';
import SellForm from '../Sell_Form/SellForm';
import CalculatorComponent from '../Section_Sell_12/Calculator';

const SellPageWrapper = () => {
    const sellFormRef = useRef(null);

    const handleScrollToForm = () => {
        sellFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <Section_Sell_1 onSellNowClick={handleScrollToForm} />
            <SectionSell_3 />
            <Section_Sell_5 />
            <MainPageSellGold />
            <SectionSell_7 onSellNowClick={handleScrollToForm} />
            <SectionSell_8 />
            <SectionSell_9 onSellNowClick={handleScrollToForm} />
            <SectionSell_9_5 onSellNowClick={handleScrollToForm} />
            <CalculatorComponent />
            <div ref={sellFormRef}>
                <SellForm />
            </div>
            <SectionSell_10 />
            <SectionSell_11_accordian />
        </div>
    );
}

export default SellPageWrapper;
