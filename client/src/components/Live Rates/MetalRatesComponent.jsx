// src/components/MetalRatesComponent.jsx
import React, { useContext, useEffect, useState } from 'react';
import { CurrencyContext } from '../Global State/CurrencyContext';
import './style.css';

const MetalRatesComponent = () => {
    const { selectedCurrency, currencySymbol } = useContext(CurrencyContext); // Use the context
    const [metalRates, setMetalRates] = useState({
        gold: null,
        silver: null,
        platinum: null,
        palladium: null
    });

    useEffect(() => {
        const fetchMetalRates = async () => {
            const url = `https://api.metals.dev/v1/latest?api_key=8MRSIYZJDIQHFAJHHWHG407JHHWHG&currency=${selectedCurrency.code}&unit=toz`;
            try {
                const response = await fetch(url, {
                    headers: { 'Accept': 'application/json' },
                });
                const result = await response.json();
                setMetalRates({
                    gold: result.metals.gold,
                    silver: result.metals.silver,
                    platinum: result.metals.platinum,
                    palladium: result.metals.palladium,
                });
            } catch (error) {
                console.error("Error fetching metal rates:", error);
            }
        };

        fetchMetalRates();
    }, [selectedCurrency.code]); // Re-fetch rates when the currency changes

    return (
        <div className="gold-live-price">
            <ul>
                <li><strong>Gold:</strong> {metalRates.gold ? `${currencySymbol}${metalRates.gold.toFixed(2)} / oz` : 'Loading...'}</li>
                <li><strong>Silver:</strong> {metalRates.silver ? `${currencySymbol}${metalRates.silver.toFixed(2)} / oz` : 'Loading...'}</li>
                <li><strong>Platinum:</strong> {metalRates.platinum ? `${currencySymbol}${metalRates.platinum.toFixed(2)} / oz` : 'Loading...'}</li>
                <li><strong>Palladium:</strong> {metalRates.palladium ? `${currencySymbol}${metalRates.palladium.toFixed(2)} / oz` : 'Loading...'}</li>
            </ul>
        </div>
    );
}

export default MetalRatesComponent;
