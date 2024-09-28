import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './Style.css';
import "./responsive.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get the final price from location state, if available
    const finalPrice = location.state?.finalPrice;

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    const handleQuantityChange = (delta) => {
        setQuantity(prevQuantity => Math.max(prevQuantity + delta, 1));
    };

    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Ensure price is handled correctly and is a string
        const rawPrice = finalPrice ? finalPrice : product.price;
        const priceToAdd = parseFloat(rawPrice.toString().replace(/[^0-9.]/g, ''));
    
        // If product.currency is already available, use that. Otherwise, default to "$".
        const currency = typeof rawPrice === 'string' 
            ? rawPrice.match(/[^\d.,]+/)?.[0] || '$' // Extract currency if available in price string
            : '$'; // Default to $ if price is a number
        
        const updatedCart = [
            ...existingCart,
            {
                ...product,
                quantity,
                price: priceToAdd,
                currency // Add the currency to the product object
            }
        ];
    
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        navigate('/cart');
    };
    
    
    

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="productDetailsWrapper">
            <div className="productDetails">
                <div className="product-detail-image-wrapper">
                    <img src={product.image} alt={product.description} className="productImage" />
                </div>
                <div className='product-details-content'>
                    <h1 className="productName">{product.name}</h1>
                    <p className="productDescription">{product.description}</p>
                    
                    {/* Use finalPrice if available, otherwise use default product price */}
                    <p className="productPrice"><b>Price: </b>{finalPrice ? finalPrice : `${product.price} $`}</p>
                    
                    <p className="productCategory"><b>Category:</b> {product.category}</p>
                    <p className="productBrand"><b>Brand:</b> {product.brand}</p>
                    <p className="productWeight"><b>Weight:</b> {product.weight}</p>
                    <p className="productFinness"><b>Finness:</b> {product.finness}</p>
                    <p className="productMetal"><b>Metal:</b> {product.metal}</p>
                    <span className="productStock">{product.inStock ? '✔️ In Stock' : '❌ Out of Stock'}</span>
                    
                    <div className="quantitySelector">
                        <button 
                            className="quantityButton" 
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <span className="quantityDisplay">{quantity}</span>
                        <button 
                            className="quantityButton" 
                            onClick={() => handleQuantityChange(1)}
                        >
                            +
                        </button>
                    </div>

                    <button onClick={handleAddToCart} className="addToCartButton">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
