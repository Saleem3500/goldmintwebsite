import React, { useState, useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import './style.css';
import "./responsive.css";

// Make sure to replace with your own public key from Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ cartItems, formData, onSubmit }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error(error);
            alert(`Payment failed: ${error.message}`);
        } else {
            // Call your server to save the order and process the payment
            await onSubmit(paymentMethod.id);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="paymentForm">
            <h2>Payment Method</h2>
            <CardElement className="cardElementStyle" />
            <button type="submit" className="submitButton" disabled={!stripe}>
                Pay Now
            </button>
        </form>
    );
};

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: ''
    });

    useEffect(() => {
        const fetchCartItems = () => {
            const storedCart = JSON.parse(localStorage.getItem('checkoutCart')) || [];
            setCartItems(storedCart);
        };

        fetchCartItems();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePayment = async (paymentMethodId) => {
        const userId = '614b8e6b3e6f1b00123f42f1';
        
        // Group cart items by currency
        const currencyGroup = cartItems.reduce((acc, item) => {
            const currency = item.currency;
            acc[currency] = acc[currency] || { totalAmount: 0, products: [] };
            acc[currency].totalAmount += item.price * item.quantity;
            acc[currency].products.push({
                productId: item._id,
                quantity: item.quantity,
                price: item.price,
            });
            return acc;
        }, {});
    
        // Send each currency group to the server for processing
        for (const [currency, { totalAmount, products }] of Object.entries(currencyGroup)) {
            const orderData = {
                userId,
                products,
                totalAmount,
                currency, // Include the currency here
                ...formData,
            };
    
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...orderData, paymentMethodId }),
                });
    
                if (response.ok) {
                    localStorage.removeItem('checkoutCart');
                    setCartItems([]);
                    alert('Order placed successfully!');
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        address: '',
                        city: '',
                        country: '',
                    });
                } else {
                    const errorData = await response.json();
                    alert(`Failed to place the order: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error placing order:', error);
                alert('Error placing order. Please try again.');
            }
        }
    };
    

    return (
        <div className="checkoutWrapper">
            <div className="dataFormWrapper">
                <h2>Billing Information</h2>
                <form className="dataForm">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        required
                    />
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                        required
                    />
                </form>
            </div>

            <Elements stripe={stripePromise}>
                <CheckoutForm
                    cartItems={cartItems}
                    formData={formData}
                    onSubmit={handlePayment}
                />
            </Elements>

            <div className="cartSummary">
                <h2>Cart Items</h2>
                {cartItems.map((item, index) => (
                    <div key={index} className="checkoutCartItem">
                        <div className="cartSummaryImage">
                            <img src={item.image} alt={item.description} className="checkoutItemImage" />
                        </div>
                        <div className="checkoutItemDetails">
                            <h3 className="checkoutItemName">{item.name}</h3>
                            {/* Dynamically show the currency */}
                            <p className="checkoutItemPrice">{item.currency}{item.price}</p>
                            <p className="checkoutItemQuantity"><b>Quantity:</b> {item.quantity}</p>
                            {/* Dynamically show the currency in the total price */}
                            <p className="checkoutItemTotalPrice">
                                <b>Total Price:</b> {item.currency}{(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Checkout;
