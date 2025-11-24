import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Orders from './pages/Orders'
import Home from './pages/Home'
import { useContext } from 'react'
import { AdminDataContext } from './context/AdminContext'
import { ToastContainer, toast } from 'react-toastify';



function App() {
  let {adminData} = useContext(AdminDataContext)
  return (
    <div className='bg-[#F9FAFB] h-screen'>
       <ToastContainer />
      {!adminData ? <Login /> : <>

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/add' element={<Add />}/>
        <Route path='/lists' element={<Lists />}/>
        <Route path='/orders' element={<Orders />}/>
      </Routes>
      </>}
       

    </div>
  )
}

export default App
