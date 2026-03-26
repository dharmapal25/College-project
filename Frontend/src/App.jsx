import React from 'react'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Officers_login from './Components/Officers_login'
import Admin_dashboard from './Components/Admin_dashboard'
import Officers_dashboard from './Components/Officers_dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Error404 from './Components/Error404'
import Home from './Components/Home'
import Enquiry from './Components/Enquiry'
import Officers from './Components/Officers'
import Logs from './Components/Logs'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/officers-login" element={<Officers_login />} />
          <Route path="/admin-dashboard" element={<Admin_dashboard />} />
          <Route path="/officers-dashboard" element={<Officers_dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/enquiry' element={<Enquiry />} />
          <Route path="/officers-team/officers" element={<Officers />} />
          <Route path='/user-logs' element={<Logs />} />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App