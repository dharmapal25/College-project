import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./Officers_login.css"

axios.defaults.withCredentials = true;

const Officers_login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        axios.post('https://college-pro.onrender.com/auth/admin-login', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Admin Login successful:', response.data);
                localStorage.setItem('adminToken', response.data.adminToken);
                navigate('/admin-dashboard');
            })
            .catch(error => {
                console.error("Login Error:", error.response?.data || error.message);
                setError(error.response?.data?.message || "Login failed. Please try again.");
            })
            .finally(() => setLoading(false));
    };

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <div className='officers-login-container'>
            <div className='officers-login-wrapper'>
                <div className='officers-login-card'>
                    {/* Header */}
                    <div className='officers-login-header'>
                        <h1 className='officers-login-title'>Officers Portal</h1>
                        <p className='officers-login-subtitle'>Administrative Access</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className='officers-error-message'>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='officers-login-form'>
                        {/* Email Input */}
                        <div className='officers-form-group'>
                            <label htmlFor='email' className='officers-form-label'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Enter your email'
                                className='officers-form-input'
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Password Input */}
                        <div className='officers-form-group'>
                            <label htmlFor='password' className='officers-form-label'>
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                                className='officers-form-input'
                                required
                                disabled={loading}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='officers-login-button'
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className='officers-login-footer'>
                        <p className='officers-footer-text'>
                            User? 
                            <span 
                                className='officers-footer-link'
                                onClick={handleBackToLogin}
                            >
                                Back to Login
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Officers_login
