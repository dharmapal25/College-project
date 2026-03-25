import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//host
axios.defaults.withCredentials = true;

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        lastname: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
// host
        axios.post('https://college-pro.onrender.com/auth/register', formData, {
        // axios.post('http://localhost:3000/auth/register', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Success:', response.data);
                navigate('/login');
            })
            .catch(error => {
                console.error("ERROR : ", error.response?.data || error.message);
            });
    };

    function SignupClick() {
        navigate('/login');
    }


    return (

        
        <div className='min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4'>
            <title>Signup</title>
            <div className='w-full max-w-md'>
                <div className='bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700'>

                    {/* Header */}
                    <div className='text-center mb-8'>
                        <h1 className='text-4xl font-bold text-white mb-2'>Welcome</h1>
                        <p className='text-gray-400 text-sm'>Create your account to get started</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='space-y-5'>

                        {/* Username */}
                        <div>
                            <label htmlFor='username' className='block text-gray-300 text-sm font-medium mb-2'>
                                Username
                            </label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                placeholder='Enter your username'
                                className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition'
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor='lastname' className='block text-gray-300 text-sm font-medium mb-2'>
                                Last Name
                            </label>
                            <input
                                type='text'
                                id='lastname'
                                name='lastname'
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder='Enter your last name'
                                className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition'
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor='email' className='block text-gray-300 text-sm font-medium mb-2'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Enter your email'
                                className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition'
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor='password' className='block text-gray-300 text-sm font-medium mb-2'>
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                                className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition'
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 mt-8 shadow-lg hover:shadow-xl'
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Footer */}
                    <div className='text-center mt-6'>
                        <p className='text-gray-400 text-sm'>
                            Already have an account?
                            <span className='text-blue-500 cursor-pointer pl-3 hover:text-blue-400' onClick={SignupClick} >
                                Login In
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup