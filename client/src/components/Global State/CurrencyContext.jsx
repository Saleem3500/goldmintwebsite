// src/context/CurrencyContext.jsx
import React, { createContext, useState } from 'react';
import gbpFlag from '../../assets/gbp-flag.png'
export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [selectedCurrency, setSelectedCurrency] = useState({
        name: "GBP",
        flag: gbpFlag,
        code: "GBP"
    });

    const currencySymbols = {
        GBP: '£',
        EUR: '€',
        USD: '$',
    };

    const value = {
        selectedCurrency,
        setSelectedCurrency,
        currencySymbol: currencySymbols[selectedCurrency.code]
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
