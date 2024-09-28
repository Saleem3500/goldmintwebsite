import React, { useState, useRef } from 'react';
import "./style.css";
import "./responsive.css"

const SellForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        images: [],
        description: '', // New input field
        goldKarat: 'none' // New dropdown field
    });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const fileInputRef = useRef(null); // Reference to the file input field

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, images: [...e.target.files] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('mobile', formData.mobile);
        data.append('email', formData.email);
        data.append('description', formData.description); // Append new field
        data.append('goldKarat', formData.goldKarat); // Append new field
        formData.images.forEach(image => {
            data.append('images', image);
        });

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users`, {
                method: 'POST',
                body: data
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('User created successfully:', result);
            setMessage('We received your details. We will get back to you with a response.');
            setMessageType('success');
            setFormData({
                name: '',
                mobile: '',
                email: '',
                images: [],
                description: '',
                goldKarat: 'none'
            });
            fileInputRef.current.value = ''; // Reset file input field
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage('There was an error submitting your details. Please try again.');
            setMessageType('error');
        }
    };

    return (
        <div className="sell-form-container">
            <form onSubmit={handleSubmit}>
            <h2>Sell Your Product</h2>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Mobile:</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>How much karat gold do you have?</label>
                    <select name="goldKarat" value={formData.goldKarat} onChange={handleChange} required>
                        <option value="24kt">24kt</option>
                        <option value="22kt">22kt</option>
                        <option value="18kt">18kt</option>
                        <option value="14kt">14kt</option>
                        <option value="9kt">9kt</option>
                        <option value="none">None of the above</option>
                    </select>
                </div>
                <div>
                    <label>Upload Images:</label>
                    <input type="file" name="images" onChange={handleImageChange} multiple required ref={fileInputRef} />
                </div>
                <div className="sell-btn">
                    <button type="submit">Submit</button>
                    {message && <p className={`message ${messageType}`}>{message}</p>}
                </div>
            </form>
        </div>
    );
};

export default SellForm;
