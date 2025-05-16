import React, { useContext } from 'react'
import { Login } from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import {AdminContext} from './context/AdminContext'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Route,Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AllAppointments from './pages/AllAppointments';
import AddDoctor from './pages/AddDoctor';
import DoctorsList from './pages/DoctorsList';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorAppointments from './pages/DoctorAppointments';
import DoctorProfile from './pages/DoctorProfile';





function App() {

//test
const {adminToken} = useContext(AdminContext)

  return adminToken ? (
    <div>
     
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-end'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
     <Login/>
     <ToastContainer/>
    </>
  )
}

export default App