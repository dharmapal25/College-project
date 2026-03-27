import React from 'react'
import './NoInternet.css'

const NoInternet = () => {
  return (
    <div className='no-internet-container'>
      <title>No Internet Connection</title>
      <div className='no-internet-content'>
        <div className='wifi-icon'>
          <svg
            width='100'
            height='100'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#000'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M5 12.55a11 11 0 0 1 14.08 0' />
            <path d='M1.42 9a16 16 0 0 1 21.16 0' />
            <path d='M9 20.13a4 4 0 0 1 6 0' />
            <line x1='12' y1='17' x2='12.01' y2='17' />
            <line x1='12' y1='5' x2='12.01' y2='5' />
            <line x1='9' y1='9.13' x2='9.01' y2='9.13' />
            <line x1='15' y1='9.13' x2='15.01' y2='9.13' />
          </svg>
        </div>
        <h1 className='no-internet-title'>NO INTERNET CONNECTION!</h1>
        <p className='no-internet-subtitle'>Please check your network connection and try again</p>
        <button 
          className='retry-button'
          onClick={() => window.location.reload()}
        >
          RETRY
        </button>
      </div>
    </div>
  )
}

export default NoInternet
