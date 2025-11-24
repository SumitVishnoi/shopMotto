import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthDataContext } from '../context/AuthContext'
import { AdminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Nav = () => {
  const navigate = useNavigate()
  const {serverUrl} = useContext(AuthDataContext)
  const {getAdmin} = useContext(AdminDataContext)

  const logout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`,
        {withCredentials: true}
      )
      console.log(result.data)
      toast.success("Admin logout successfully!")
      getAdmin()
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error("Admin logout failed!")
    }
  }
  return (
      <div className='flex justify-between items-center bg-white p-5'>
        <h2 className='text-3xl font-bold items-center text-[#4F46E5] cursor-pointer' onClick={()=> navigate("/")}>ShopMotto</h2>
        <button className='px-3 py-2 bg-zinc-700 text-white font-medium rounded-md cursor-pointer' onClick={logout}>Logout</button>
      </div>
  )
}

export default Nav
