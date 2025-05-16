import React, { useContext } from 'react'
import { Login } from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import {AdminContext} from './context/AdminContext'
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {

//test
const {adminToken} = useContext(AdminContext)

  return adminToken ? (
    <div>
     
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-end'>
        <Sidebar/>
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