import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

axios.defaults.withCredentials = true

const Login = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields')
            setLoading(false)
            return
        }

        axios.post('https://college-pro.onrender.com/api/auth/login', formData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            timeout: 10000
        })
            .then(response => {
                console.log('Login successful:', response.data)
                
                // Store token and user data
                const userData = {
                    email: formData.email,
                    loginTime: new Date().toLocaleString()
                }
                
                localStorage.setItem('token', response.data.token || 'auth_token')
                localStorage.setItem('user', JSON.stringify(userData))
                localStorage.setItem('userEmail', formData.email)
                
                // Redirect to dashboard
                navigate('/dashboard', { replace: true })
            })
            .catch(error => {
                console.error("Login error details:", {
                    message: error.message,
                    code: error.code,
                    status: error.response?.status,
                    data: error.response?.data,
                    isNetworkError: error.message === 'Network Error'
                })
                const errorMsg = error.response?.data?.message || 'Login failed. Please try again.'
                setError(errorMsg)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function loginClick() {
        navigate('/signup')
    }

    return (
        <div className='login-page'>
            <title>Login</title>
            <div className='login-container'>
                <div className='login-card'>

                    {/* Header */}
                    <div className='login-header'>
                        <h1>Login</h1>
                        <p>Sign in to your account</p>
                    </div>

                    {error && (
                        <div className='login-error'>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='login-form'>

                        {/* Email */}
                        <div className='form-group'>
                            <label htmlFor='email'>Email Address</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Enter your email'
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='login-button'
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className='login-footer'>
                        <p>
                            Don't have an account? <span onClick={loginClick}>Sign Up</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login