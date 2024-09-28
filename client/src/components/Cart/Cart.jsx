import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyPageCollection from "../Buy Page/BuyPageCollection/BuyPageCollection"
import './style.css';
import "./responsive.css"

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = () => {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(storedCart);
        };

        fetchCartItems();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const calculateTotalPrice = () => {
        // Group items by currency
        const totalsByCurrency = cartItems.reduce((acc, item) => {
            const { price, quantity, currency } = item;
            const totalItemPrice = price * quantity;
            if (!acc[currency]) {
                acc[currency] = 0;
            }
            acc[currency] += totalItemPrice;
            return acc;
        }, {});

        return totalsByCurrency;
    };

    const handleBuyProduct = () => {
        localStorage.setItem('checkoutCart', JSON.stringify(cartItems));
        localStorage.removeItem('cart');
        setCartItems([]);
        navigate('/checkout');
    };

    const handleClearCart = () => {
        localStorage.removeItem('cart');
        setCartItems([]);
    };

    const totalsByCurrency = calculateTotalPrice();

    return (
        <>
            <div className="cart-wrapper-main">
                <div className="cartWrapper">
                    <h1 className="cartTitle">Your Cart</h1>
                    {cartItems.length === 0 ? (
                        <p className="emptyCartMessage">Your cart is empty.</p>
                    ) : (
                        <div>
                            <ul className="cartItemsList">
                                {cartItems.map((item, index) => (
                                    <li key={index} className="cartItem">
                                        <div className="cart-item-image-wrapper">
                                            <img src={item.image} alt={item.description} className="cartItemImage" />
                                        </div>
                                        <div className="cartItemDetails">
                                            <h2 className="cartItemName">{item.name}</h2>
                                            
                                            {/* Display price with currency */}
                                            <p className="cartItemPrice">{item.currency}{item.price}</p>
                                            <p className="cartItemQuantity"><b>Quantity:</b> {item.quantity}</p>
                                            
                                            {/* Display total price with currency */}
                                            <p className="cartItemTotalPrice">
                                                <b>Total Price:</b> {item.currency}{(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="cartSummary">
                                {Object.entries(totalsByCurrency).map(([currency, total]) => (
                                    <p key={currency} className="totalPrice"><b>Total Price:</b> {total.toFixed(2)}({currency})</p>
                                ))}
                                <button onClick={handleBuyProduct} className="buyProductButton">Buy Product</button> <br />
                                <button onClick={handleClearCart} className="clearCartButton">Clear Cart</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <BuyPageCollection />
        </>
    );
};

export default Cart;
