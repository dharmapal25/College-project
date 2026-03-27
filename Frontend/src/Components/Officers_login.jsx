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

        // Check if this is admin login (admin@college.com)
        const isAdminEmail = formData.email.toLowerCase() === 'admin@college.com';
        
        // Choose endpoint based on email
        const endpoint = isAdminEmail 
            ? 'https://college-pro.onrender.com/api/auth/admin-login'
            : 'https://college-pro.onrender.com/api/auth/officers-login';

        axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Login successful:', response.data);
                
                if (isAdminEmail) {
                    // Admin Login
                    localStorage.setItem('adminToken', response.data.adminToken);
                    localStorage.setItem('adminEmail', formData.email);
                    navigate('/admin-dashboard');
                } else {
                    // Officer Login
                    localStorage.setItem('officerToken', response.data.token);
                    localStorage.setItem('officerEmail', response.data.officer.email);
                    localStorage.setItem('officerName', response.data.officer.username);
                    
                    // Store full officer data for dashboard
                    localStorage.setItem('officerData', JSON.stringify({
                        id: response.data.officer.id,
                        email: response.data.officer.email,
                        username: response.data.officer.username,
                        category: response.data.officer.category
                    }));
                    
                    // Redirect based on isAdmin flag (officer with admin email)
                    if (response.data.isAdmin) {
                        navigate('/admin-dashboard', { 
                            state: { officer: response.data.officer } 
                        });
                    } else {
                        navigate('/officers-dashboard', { 
                            state: { officer: response.data.officer } 
                        });
                    }
                }
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
            <title>Officers Login</title>
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
