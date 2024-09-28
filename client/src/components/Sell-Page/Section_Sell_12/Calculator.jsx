import React, { useContext, useState, useEffect } from 'react';
import { CurrencyContext } from '../../Global State/CurrencyContext';
import "./style.css"

const CalculatorComponent = () => {
    const { selectedCurrency, currencySymbol } = useContext(CurrencyContext);
    const [userWeightOz, setUserWeightOz] = useState(0); 
    const [userWeightGrams, setUserWeightGrams] = useState(0); 
    const [metalRates, setMetalRates] = useState({ gold: null, silver: null }); 
    const [loading, setLoading] = useState(true); 

    const goldPurity = {
        "24kt": 0.999,
        "22kt": 0.916,
        "18kt": 0.750,
        "14kt": 0.585,
        "9kt": 0.375
    };

    useEffect(() => {
        const fetchMetalRates = async () => {
            const url = `https://api.metals.dev/v1/latest?api_key=8MRSIYZJDIQHFAJHHWHG407JHHWHG&currency=${selectedCurrency.code}&unit=toz`;
            try {
                const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
                const result = await response.json();
                setMetalRates({ gold: result.metals.gold, silver: result.metals.silver });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching metal rates:", error);
                setLoading(false);
            }
        };

        fetchMetalRates();
    }, [selectedCurrency]);

    // Gold Calculation (Ounces and Grams)
    const calculateGoldPriceOz = (purity) => {
        if (loading) return 'Loading...';
        if (!metalRates.gold || userWeightOz <= 0) return `${currencySymbol}0.00`;

        const pureGoldWeight = userWeightOz * purity;
        const pricePerOunce = metalRates.gold;
        const premiumPercentage = 0.03; 

        const totalPrice = (pureGoldWeight * pricePerOunce - premiumPercentage);
        return `${currencySymbol}${totalPrice.toFixed(2)}`;
    };

    const calculateGoldPriceGrams = (purity) => {
        if (loading) return 'Loading...';
        if (!metalRates.gold || userWeightGrams <= 0) return `${currencySymbol}0.00`;

        const pricePerGram = metalRates.gold / 31.103; 
        const pureGoldWeight = userWeightGrams * purity; 
        const premiumPercentage = 0.03; 

        const totalPrice = (pureGoldWeight * pricePerGram - premiumPercentage);
        return `${currencySymbol}${totalPrice.toFixed(2)}`;
    };

    // Silver Calculation (Ounces)
    const calculateSilverPriceOz = (purity) => {
        if (loading) return 'Loading...';
        if (!metalRates.silver || userWeightOz <= 0) return `${currencySymbol}0.00`;

        const pureSilverWeight = userWeightOz * purity;
        const pricePerOunce = metalRates.silver;

        const totalPrice = (pureSilverWeight * pricePerOunce);
        return `${currencySymbol}${totalPrice.toFixed(2)}`;
    };

    // Silver Calculation (Grams)
    const calculateSilverPriceGrams = (purity) => {
        if (loading) return 'Loading...';
        if (!metalRates.silver || userWeightGrams <= 0) return `${currencySymbol}0.00`;

        const pricePerGram = metalRates.silver / 31.103; 
        const pureSilverWeight = userWeightGrams * purity;

        const totalPrice = (pureSilverWeight * pricePerGram);
        return `${currencySymbol}${totalPrice.toFixed(2)}`;
    };

    return (
        <>
        <div className="main-wrapper-calculator">
            <h3>Gold Price Calculator</h3>
            <div className="calculator-container">
                <div className="ounces-calculator">
                    <h4>Calculate Price in Ounces</h4>
                    <label>
                        Enter Weight (oz):
                        <input
                            type="number"
                            value={userWeightOz}
                            onChange={(e) => setUserWeightOz(parseFloat(e.target.value))}
                            placeholder="Enter weight in oz"
                        />
                    </label>

                    <div className="results">
                        {Object.keys(goldPurity).map((karat) => (
                            <div key={karat} className="result-row">
                                <label>{karat}</label>
                                <output>{calculateGoldPriceOz(goldPurity[karat])}</output>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grams-calculator">
                    <h4>Calculate Price in Grams</h4>
                    <label>
                        Enter Weight (grams):
                        <input
                            type="number"
                            value={userWeightGrams}
                            onChange={(e) => setUserWeightGrams(parseFloat(e.target.value))}
                            placeholder="Enter weight in grams"
                        />
                    </label>

                    <div className="results">
                        {Object.keys(goldPurity).map((karat) => (
                            <div key={karat} className="result-row">
                                <label>{karat}</label>
                                <output>{calculateGoldPriceGrams(goldPurity[karat])}</output>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="main-wrapper-calculator">
            <h3>Silver Price Calculator</h3>
            <div className="calculator-container">
                <div className="ounces-calculator">
                    <h4>Calculate Price in Ounces</h4>
                    <label>
                        Enter Weight (oz):
                        <input
                            type="number"
                            value={userWeightOz}
                            onChange={(e) => setUserWeightOz(parseFloat(e.target.value))}
                            placeholder="Enter weight in oz"
                        />
                    </label>

                    <label>
                        Enter Purity (%):
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            onChange={(e) => setUserWeightOz(parseFloat(e.target.value) / 100)}
                            placeholder="Enter purity percentage"
                        />
                    </label>

                    <div className="results">
                        <div className="result-row">
                            <label>Silver Price:</label>
                            <output>{calculateSilverPriceOz(userWeightOz)}</output>
                        </div>
                    </div>
                </div>

                <div className="grams-calculator">
                    <h4>Calculate Price in Grams</h4>
                    <label>
                        Enter Weight (grams):
                        <input
                            type="number"
                            value={userWeightGrams}
                            onChange={(e) => setUserWeightGrams(parseFloat(e.target.value))}
                            placeholder="Enter weight in grams"
                        />
                    </label>

                    <label>
                        Enter Purity (%):
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            onChange={(e) => setUserWeightGrams(parseFloat(e.target.value) / 100)}
                            placeholder="Enter purity percentage"
                        />
                    </label>

                    <div className="results">
                        <div className="result-row">
                            <label>Silver Price:</label>
                            <output>{calculateSilverPriceGrams(userWeightGrams)}</output>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default CalculatorComponent;