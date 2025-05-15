import React, { useContext } from 'react'
import { Login } from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import {AdminContext} from './context/AdminContext'
import Navbar from './components/Navbar';

function App() {

//test
const {adminToken} = useContext(AdminContext)

  return adminToken ? (
    <div>
     
      <ToastContainer/>
      <Navbar/>
    </div>
  ) : (
    <>
     <Login/>
     <ToastContainer/>
    </>
  )
}

export default App