import React, { useState, useEffect } from 'react';
import "./style.css";
import "./responsive.css";

const AdminPortal = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        brand: '',
        weight: '',
        finness: '',
        metal: '',
        percentage: '',
        inStock: true,
        image: null,
    });
    const [error, setError] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [activeSection, setActiveSection] = useState('addProduct');

    const categories = ['Accessories', 'Gift Items', 'Gold Bars', 'Gold Coins', 'Palladium Coins', 'Platinum Bars', 'Platinum Coins', 'Silver Bars', 'Silver Coins'];
    const brands = ['Umicore', 'PAMP', 'Metalor', 'Gold Bank', 'Heimerle + Meule', 'Perth Mint', 'The Royal Mint', 'Canadian Mint', 'US Mint', 'PAMP Lunar Series', 'Karat Bar', 'Austrian Mint', 'Unknown', 'Nadir Gold', 'New Zealand Mint', 'Rand Refinery', 'Chinese Mint', 'Valcambi', 'MIXED', 'Sovereign Mints', 'Generic', 'Britannia'];
    const weights = ['0.10', '250 Grams', '5KG', '5 Grams', '1KG', '1/10 Ounce', '50 Grams', '3.99', '1 Ounce', '0', '8 Grams', '2 Ounce', '10 Gram', '1/2 Ounce', '20 Gram', '30 Grams', '40 Grams', '100 Grams', '500 Grams', '10 Ounce', '1/4 Ounce', '10 Tola', '3.00', '2.5 Grams', '1 Grams', '0.5 Grams', '6.00'];
    const finnesses = ['902', '916.7', '999', '999.9'];
    const metals = ['Gold', 'Silver', 'Platinum', 'Palladium', 'Mixed'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/products`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewProduct({ ...newProduct, image: e.target.files[0] });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const { name, price, description, category, brand, weight, finness, metal, percentage } = newProduct;
        if (!name || !price || !description || !category || !brand || !weight || !finness || !metal) return;

        const formData = new FormData();
        for (const key in newProduct) {
            formData.append(key, newProduct[key]);
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/products`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const addedProduct = await response.json();
            setProducts([...products, addedProduct]);
            setNewProduct({
                name: '',
                price: '',
                description: '',
                category: '',
                brand: '',
                weight: '',
                finness: '',
                metal: '',
                percentage: '',
                inStock: true,
                image: null,
            });
        } catch (error) {
            setError(error.message);
            console.error('Error adding product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setNewProduct(product);
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const { name, price, description, category, brand, weight, finness, metal, percentage } = newProduct;
        if (!name || !price || !description || !category || !brand || !weight || !finness || !metal) return;

        const formData = new FormData();
        for (const key in newProduct) {
            formData.append(key, newProduct[key]);
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/products/${editingProduct._id}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const updatedProduct = await response.json();
            setProducts(products.map((p) => (p._id === updatedProduct._id ? updatedProduct : p)));
            setNewProduct({
                name: '',
                price: '',
                description: '',
                category: '',
                brand: '',
                weight: '',
                finness: '',
                metal: '',
                percentage: '',
                inStock: true,
                image: null,
            });
            setEditingProduct(null);
        } catch (error) {
            setError(error.message);
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setProducts(products.filter((p) => p._id !== id));
        } catch (error) {
            setError(error.message);
            console.error('Error deleting product:', error);
        }
    };

    //sell
    const [sellPageOrders, setSellPageOrders] = useState([]);
    // const [activeSection, setActiveSection] = useState('addProduct');
    // const [error, setError] = useState('');

    useEffect(() => {
        const fetchSellPageOrders = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSellPageOrders(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching sell page orders:', error);
            }
        };

        if (activeSection === 'sellPageOrders') {
            fetchSellPageOrders();
        }
    }, [activeSection]);

    //orders
    const [orders, setOrders] = useState([]);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/orders`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError('Error fetching orders');
                console.error(err);
            }
        };

        if (activeSection === 'orders') {
            fetchOrders();
        }
    }, [activeSection]);

    return (
        <div className="admin-portal">
            <h1>Admin Portal</h1>
            <div className="admin-buttons">
                <button onClick={() => setActiveSection('addProduct')}>Add Product</button>
                <button onClick={() => setActiveSection('orders')}>Orders</button>
                <button onClick={() => setActiveSection('sellPageOrders')}>Sell Page Orders</button>
            </div>

            {activeSection === 'addProduct' && (
                <div className="admin-portal-form">
                    <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
                        <h1>Add Product</h1>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="price"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                        />
                        <select
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        <select
                            name="brand"
                            value={newProduct.brand}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Brand</option>
                            {brands.map((brand, index) => (
                                <option key={index} value={brand}>{brand}</option>
                            ))}
                        </select>
                        <select
                            name="weight"
                            value={newProduct.weight}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Weight</option>
                            {weights.map((weight, index) => (
                                <option key={index} value={weight}>{weight}</option>
                            ))}
                        </select>
                        <select
                            name="finness"
                            value={newProduct.finness}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Finness</option>
                            {finnesses.map((finness, index) => (
                                <option key={index} value={finness}>{finness}</option>
                            ))}
                        </select>
                        <select
                            name="metal"
                            value={newProduct.metal}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Metal</option>
                            {metals.map((metal, index) => (
                                <option key={index} value={metal}>{metal}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="percentage"
                            placeholder="Percentage"
                            value={newProduct.percentage}
                            onChange={handleInputChange}
                            required
                        />
                        <input type="file" name="image" onChange={handleFileChange} required />
                        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
                    </form>
                    {error && <p className="error">{error}</p>}
                    <h2>Products List</h2>
                    <ul>
                        {products.map((product) => (
                            <li key={product._id}>
                                <div className="list-item">
                                    <h4>{product.name}</h4>
                                </div>
                                <div className="list-item">
                                    <p><strong>Price:</strong> ${product.price}</p>
                                </div>
                                <div className="list-item">
                                    <p><strong>Description:</strong> {product.description}</p>
                                </div>
                                <div className="list-item">
                                    <p><strong>ID:</strong> {product._id}</p>
                                </div>
                                <div className="list-item">
                                    {product.image && <img src={product.image} alt={product.name} width="100" />}
                                </div>
                                <div className="list-item">
                                    <button onClick={() => handleEdit(product)}>Edit</button>
                                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            )}

            {activeSection === 'orders' && (
                <div className="order-wrapper">
                    <h2>Buy Page Orders</h2>
                    {error && <p>{error}</p>}
                    {orders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        <ul>
                            {orders.map(order => (
                                <li key={order._id}>
                                    <h4>Order ID: {order._id}</h4>
                                    <p>Name: {order.name}</p>
                                    <p>Email: {order.email}</p>
                                    <p>Phone: {order.phone}</p>
                                    <p>Address: {order.address}</p>
                                    <p>City: {order.city}</p>
                                    <p>Country: {order.country}</p>
                                    <p>Total Amount: {order.totalAmount} {order.currency || 'PKR'}</p>

                                    <h5>Products:</h5>
                                    <ul>
                                        {order.products.map((product, index) => (
                                            <li key={index}>
                                                <p>Product Name: {product._id}</p>
                                                <p>Product Price: {product.price}</p>
                                                <p>Product Category: {product.category}</p>
                                                <p>Quantity: {product.quantity}</p>
                                                {/* Render other fields of the product as needed */}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}

                        </ul>
                    )}
                </div>
            )}




            {activeSection === 'sellPageOrders' && (
                <div className="sell-order-wrapper">
                    <h2>Sell Page Orders</h2>
                    {error && <div className="error-message">{error}</div>}
                    <div className="sell-page-orders">
                        {sellPageOrders.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            sellPageOrders.map(order => (
                                <div key={order._id} className="order-card">
                                    <h3>Name: {order.name}</h3>
                                    <p>Mobile: {order.mobile}</p>
                                    <p>Email: {order.email}</p>
                                    <p>Description: {order.description}</p>
                                    <p>Gold Karat: {order.goldKarat}</p>
                                    <div className="images">
                                        {order.images.map((image, index) => (
                                            <img key={index} src={image} alt={`Order Image ${index + 1}`} />
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminPortal;
