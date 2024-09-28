import React, { useState } from 'react';
import { useAuth } from '../Authorization/Auth';
import { useNavigate } from 'react-router-dom';
import "./style.css";
import "./responsive.css";

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
            login();
            navigate('/admin'); // Redirect to Admin Portal
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="authentication-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Admin Login</h1>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div className="authentic-submit-btn">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
