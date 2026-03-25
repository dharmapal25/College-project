import React from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Error404 from './Components/Error404'
import Home from './Components/Home'
import Enquiry from './Components/Enquiry'
import Officers from './Components/Officers'
import Logs from './Components/Logs'
import Admin from './Components/Admin'

const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/enquiry' element={<Enquiry />} />
          <Route path="/officers-team/officers" element={<Officers />} />
          <Route path='/user-logs' element={<Logs />} />
          <Route path='/admin' element={<Admin />} />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </BrowserRouter>


    </div>
  )
}

export default App