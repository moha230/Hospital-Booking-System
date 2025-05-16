import React, { useContext } from 'react'
import {Route,Routes} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {AdminContext} from '@/context/AdminContext'
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Login } from '@/pages/Login'
import Dashboard from '@/pages/Admin/Dashboard';
import AllAppointments from '@/pages/Admin/AllAppointments';
import DoctorRegistration from '@/pages/Admin/DoctorRegistration';
import DoctorsList from '@/pages/Admin/DoctorsList';




const  App = () => {

//test
const {adminToken} = useContext(AdminContext)

  return adminToken ? (
    <div className='bg-background'>
     
      <ToastContainer/>
      <Navbar/>
      <div className='flex flex-row-reverse min-h-screen'>
        <Sidebar/>
        <div className='flex-1 p-2'>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/doctor-registration' element={<DoctorRegistration />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
        </Routes>
        </div>
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