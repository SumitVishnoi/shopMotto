import React, { useContext, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import axios from "axios"
import { AuthDataContext} from '../context/AuthContext';
import { AdminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Login = () => {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    let {serverUrl} = useContext(AuthDataContext)
    let {getAdmin} = useContext(AdminDataContext)
    let navigate = useNavigate()

    const AdminLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const result = await axios.post(`${serverUrl}/api/admin/login`,
                {email, password},
                {withCredentials: true}
            )
            console.log(result.data)
            setLoading(false)
            toast.success("Admin login successfully!")
            getAdmin()
            navigate('/')
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Admin login failed!")
        }
    }
  return (
    <div className='p-3'>
        <h1 className='font-bold text-2xl'>ShopMotto</h1>
        <div className='h-screen flex flex-col justify-center items-center gap-5'>
            <h1 className='text-[#4F46E5] font-medium text-2xl'>Admin Login</h1>
      <form className='bg-[#FFFFFF] w-[90%] md:w-[40%] flex flex-col justify-center gap-4 p-8 rounded' onSubmit={AdminLogin}>
        <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='font-medium'>Email</label>
            <input type="email" autoComplete='email' id='email' className='border-1 border-[#a2a0a0c8] rounded-md p-2 text-xl' placeholder='Enter Admin Email' required onChange={(e)=> setEmail(e.target.value)} value={email} />
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="current-password" className='font-medium'>Password</label>
            <input type="password" autoComplete='current-password' id='current-password' className='border-1 border-[#a2a0a0c8] rounded-md p-2 text-xl' placeholder='Enter Admin Password' required onChange={(e)=> setPassword(e.target.value)} value={password}/>
        </div>

        <button className='px-5 py-2 bg-[#4F46E5] rounded-md text-white font-medium'>{loading ? <Loader /> : "Sign In"}</button>

        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                    Or continue with
                </span>
            </div>
        </div>

        <div className='border-1 border-[#a2a0a0c8] rounded p-2 flex justify-center items-center gap-2'>
            <FcGoogle className='w-5 h-5'/>
            <span className='text-[#808080c2] font-medium'>Google</span>
        </div>
      </form>
        </div>
    </div>
  )
}

export default Login
