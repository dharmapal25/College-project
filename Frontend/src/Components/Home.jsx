import React from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import "./Dashboard.css"
import { useLocation } from 'react-router-dom'
const Home = () => {

  return (
    <div style={{display:"flex", flexDirection:"row",gap:"20px"}}>
      <Navbar/>
      
      <Dashboard/>
    </div>
  )
}

export default Home