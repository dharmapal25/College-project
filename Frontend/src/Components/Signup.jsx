import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'

axios.defaults.withCredentials = true

const Signup = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
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

        if (!formData.username || !formData.email || !formData.password) {
            setError('Please fill in all fields')
            setLoading(false)
            return
        }

        axios.post('https://college-pro.onrender.com/api/auth/register', formData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(response => {
                console.log('Signup successful:', response.data)
                alert('Account created successfully! Please login.')
                navigate('/login', { replace: true })
            })
            .catch(error => {
                console.error("Signup error:", error)
                const errorMsg = error.response?.data?.message || 'Signup failed. Please try again.'
                setError(errorMsg)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function SignupClick() {
        navigate('/login')
    }

    return (
        <div className='signup-page'>
                <title>Sign Up</title>
            <div className='signup-container'>
                <div className='signup-card'>

                    {/* Header */}
                    <div className='signup-header'>
                        <h1>Welcome</h1>
                        <p>Create your account to get started</p>
                    </div>

                    {error && (
                        <div className='signup-error'>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='signup-form'>

                        {/* Username */}
                        <div className='form-group'>
                            <label htmlFor='username'>Username</label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                placeholder='Enter your username'
                                required
                            />
                        </div>

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
                            className='signup-button'
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className='signup-footer'>
                        <p>
                            Already have an account?
                            <span onClick={SignupClick}>Login</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup