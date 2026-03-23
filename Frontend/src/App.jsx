import React from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Error404 from './Components/Error404'

const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1> Home page </h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App