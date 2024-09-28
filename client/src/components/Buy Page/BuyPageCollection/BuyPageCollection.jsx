import React, { useContext, useState, useEffect, useRef } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CurrencyContext } from '../../Global State/CurrencyContext'; // Currency context import
import './style.css';
import "./responsive.css";

const BuyPageCollection = () => {
    const { selectedCurrency, currencySymbol } = useContext(CurrencyContext); // Use context for currency selection
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isBrandOpen, setIsBrandOpen] = useState(false);
    const [isWeightOpen, setIsWeightOpen] = useState(false);
    const [isFinnessOpen, setIsFinnessOpen] = useState(false);
    const [isMetalOpen, setIsMetalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        categories: [],
        brands: [],
        weights: [],
        finness: [],
        metals: []
    });
    const [metalRates, setMetalRates] = useState({ gold: null });

    const categoryRef = useRef(null);
    const brandRef = useRef(null);
    const weightRef = useRef(null);
    const finnessRef = useRef(null);
    const metalRef = useRef(null);

    // Adjust max-height for collapsible filters
    useEffect(() => {
        const adjustMaxHeight = (ref, isOpen) => {
            if (ref.current) {
                ref.current.style.maxHeight = isOpen ? `${ref.current.scrollHeight}px` : '0px';
            }
        };

        adjustMaxHeight(categoryRef, isCategoryOpen);
        adjustMaxHeight(brandRef, isBrandOpen);
        adjustMaxHeight(weightRef, isWeightOpen);
        adjustMaxHeight(finnessRef, isFinnessOpen);
        adjustMaxHeight(metalRef, isMetalOpen);
    }, [isCategoryOpen, isBrandOpen, isWeightOpen, isFinnessOpen, isMetalOpen]);

    // Fetch products
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/products`)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Filter products
    useEffect(() => {
        const filtered = products.filter(product => {
            const matchesFilter = (filterCategory, filterValues) =>
                filterValues.length === 0 || filterValues.includes(product[filterCategory]);

            return (
                matchesFilter('category', filters.categories) &&
                matchesFilter('brand', filters.brands) &&
                matchesFilter('weight', filters.weights) &&
                matchesFilter('finness', filters.finness) &&
                matchesFilter('metal', filters.metals)
            );
        });

        setFilteredProducts(filtered);
    }, [filters, products]);

    // Fetch live metal rates
    useEffect(() => {
        const fetchMetalRates = async () => {
            const url = `https://api.metals.dev/v1/latest?api_key=8MRSIYZJDIQHFAJHHWHG407JHHWHG&currency=${selectedCurrency.code}&unit=toz`;
            try {
                const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
                const result = await response.json();
                setMetalRates({
                    gold: result.metals.gold
                });
            } catch (error) {
                console.error("Error fetching metal rates:", error);
            }
        };

        fetchMetalRates();
    }, [selectedCurrency]);

    // Calculate final price of a product
    const calculateFinalPrice = (product) => {
        const metalRatePerGram = metalRates.gold / 31.103; // Convert oz to grams
        // const finalPrice = metalRatePerGram + (metalRatePerGram * (product.percentage / 100)) + product.price;
        const finalPrice = metalRatePerGram + product.price + (product.percentage / 100);
        return `${currencySymbol}${finalPrice.toFixed(2)}`;
    };

    const handleFilterChange = (category, value, isChecked) => {
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters };
            if (isChecked) {
                newFilters[category].push(value);
            } else {
                newFilters[category] = newFilters[category].filter(item => item !== value);
            }
            return newFilters;
        });
    };

    const filterOptions = (category, options) => (
        options.map(option => (
            <li key={option}>
                <input
                    type="checkbox"
                    onChange={(e) => handleFilterChange(category, option, e.target.checked)}
                />
                {option}
            </li>
        ))
    );

    return (
        <>
            <div className="buyPageWrapper">
                <div className="buyCollectionMain">
                    <div className="filters">
                        <h4>Filters</h4>
                        <div className="filterSection">
                            <div className="filterHeader" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                                <h4>Categories</h4>
                                {isCategoryOpen ? <FaMinus /> : <FaPlus />}
                            </div>
                            <ul ref={categoryRef} className="filterList">
                                {filterOptions('categories', ['Accessories', 'Gift Items', 'Gold Bars', 'Gold Coins', 'Palladium Coins', 'Platinum Bars', 'Platinum Coins', 'Silver Bars', 'Silver Coins'])}
                            </ul>
                        </div>
                        <div className="filterSection">
                            <div className="filterHeader" onClick={() => setIsBrandOpen(!isBrandOpen)}>
                                <h4>Brands</h4>
                                {isBrandOpen ? <FaMinus /> : <FaPlus />}
                            </div>
                            <ul ref={brandRef} className="filterList">
                                {filterOptions('brands', ['Umicore', 'PAMP', 'Metalor', 'Gold Bank', 'Heimerle + Meule', 'Perth Mint', 'The Royal Mint', 'Canadian Mint', 'US Mint', 'PAMP Lunar Series', 'Karat Bar', 'Austrian Mint', 'Unknown', 'Nadir Gold', 'New Zealand Mint', 'Rand Refinery', 'Chinese Mint', 'Valcambi', 'MIXED', 'Sovereign Mints', 'Generic', 'Britannia'])}
                            </ul>
                        </div>
                        <div className="filterSection">
                            <div className="filterHeader" onClick={() => setIsWeightOpen(!isWeightOpen)}>
                                <h4>Weight</h4>
                                {isWeightOpen ? <FaMinus /> : <FaPlus />}
                            </div>
                            <ul ref={weightRef} className="filterList">
                                {filterOptions('weights', ['0.10', '250 Grams', '5KG', '5 Grams', '1KG', '1/10 Ounce', '50 Grams', '3.99', '1 Ounce', '0', '8 Grams', '2 Ounce', '10 Gram', '1/2 Ounce', '20 Gram', '30 Grams', '40 Grams', '100 Grams', '500 Grams', '10 Ounce', '1/4 Ounce', '10 Tola', '3.00', '2.5 Grams', '1 Grams', '0.5 Grams', '6.00'])}
                            </ul>
                        </div>
                        <div className="filterSection">
                            <div className="filterHeader" onClick={() => setIsFinnessOpen(!isFinnessOpen)}>
                                <h4>Finness</h4>
                                {isFinnessOpen ? <FaMinus /> : <FaPlus />}
                            </div>
                            <ul ref={finnessRef} className="filterList">
                                {filterOptions('finness', ['902', '916.7', '999', '999.9'])}
                            </ul>
                        </div>
                        <div className="filterSection">
                            <div className="filterHeader" onClick={() => setIsMetalOpen(!isMetalOpen)}>
                                <h4>Metal</h4>
                                {isMetalOpen ? <FaMinus /> : <FaPlus />}
                            </div>
                            <ul ref={metalRef} className="filterList">
                                {filterOptions('metals', ['Gold', 'Silver', 'Platinum', 'Palladium'])}
                            </ul>
                        </div>
                    </div>

                    <div className="allProducts">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div className="product" key={product._id}>
                                    <Link
                                        to={`/product/${product._id}`}
                                        className="productLink"
                                        state={{ finalPrice: calculateFinalPrice(product) }}  // Pass the final price
                                    >
                                        <div className="product-image-wrapper">
                                            <img src={product.image} alt={product.description} className="productImage" />
                                        </div>
                                        <div className="product-content">
                                            <h4 className="productName">{product.name}</h4>
                                            <span className="productStock">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                                            <span className="productPrice">{calculateFinalPrice(product)}</span>
                                        </div>
                                    </Link>

                                </div>
                            ))
                        ) : (
                            <div>No products found</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuyPageCollection;