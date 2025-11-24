import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';



const Login = () => {
    let navigate = useNavigate()
    let [loading, setLoading] = useState(false)
    let {serverUrl} = useContext(authDataContext)
    let {userData, setUserData} = useContext(userDataContext)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    const {getCurrentUser} = useContext(userDataContext)

    const handleLogin = async (e) => {
      setLoading(true)
        e.preventDefault()
        try {
            let result = await axios.post(`${serverUrl}/api/auth/login`, {
                email,
                password
            }, {withCredentials: true})
            setUserData(result.data)
            console.log(result);
            setLoading(false)
            toast.success("Login Successfully!")
            getCurrentUser()
            navigate("/")
        } catch (error) {
          setLoading(false)
          toast.error("Login Failed!")
          console.log(error);
        }
    }
    

  return (
    <div className='w-full h-screen p-5 flex flex-col items-start'>
        <h2 className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          <span className='text-[#808080d7]'>Shop</span>Motto
        </h2>
        
        
        <div className='flex justify-center w-full h-full items-center mt-10'>
             <form
            onSubmit={handleLogin}
            className='bg-white w-full md:w-[40%] text-center p-8 rounded shadow-2xl shadow-gray'>
      <h1 className='text-3xl font-medium mb-5'>Login</h1>
      <div className='flex flex-col gap-5 '>
        <div className='flex flex-col items-start'>
            <label htmlFor="email" className='font-medium'>Email</label>
            <input
            id='email'
            autoComplete="email"
            type="email"
            className='border-1 border-[#aaa9a9] text-xl rounded-sm outline-none w-full p-2'
            required
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            />
        </div>
        <div className=' flex flex-col items-start'>
            <label htmlFor="password" className='font-medium '>Password</label>
            <input
            id='password'
            autoComplete="current-password"
            type="password" 
            className='border-1 border-[#aaa9a9] text-xl rounded-sm outline-none w-full p-2' 
            required
            onChange={(e)=> setPassword(e.target.value)}
            />
        </div>
      </div>
        <button className='py-3 rounded-md font-medium w-full bg-zinc-700 mt-3 text-white mb-1 cursor-pointer'>{loading ? <Loader /> : "Login"}</button>
         <p className='text-[15px] text-[gray] '>Create new account <span className='text-blue-900 cursor-pointer font-medium' onClick={()=> navigate('/register')}>SignUp</span></p>
      </form>
        </div>
        </div>
     
  )
}

export default Login
