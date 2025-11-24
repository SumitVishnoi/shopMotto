// import React, { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { IoMdArrowBack } from "react-icons/io";
// import axios from 'axios';
// import { authDataContext } from '../context/AuthContext';
// import { userDataContext } from '../context/UserContext';
// import { toast } from 'react-toastify';
// import Loader from '../components/Loader';


// const Register = () => {
//     let navigate = useNavigate()
//     let [loading, setLoading] = useState(false)
//     let {serverUrl} = useContext(authDataContext)
//     let {userData, setUserData} = useContext(userDataContext)
//     let [name, setName] = useState("")
//     let [email, setEmail] = useState("")
//     let [password, setPassword] = useState("")

//     const handleSignUp = async (e) => {
//         setLoading(true)
//         e.preventDefault()
//         try {
//             let result = await axios.post(serverUrl + "/api/auth/register", {
//                 name,
//                 email,
//                 password
//             }, {withCredentials: true})
//             setUserData(result.data)
//             console.log(result);
//             setLoading(false)
//             toast.success("Sign Up Successfully!")
//             navigate("/")
            
//         } catch (error) {
//             setLoading(false)
//             toast.success("Sign Up failed!")
//             console.log(error);
//         }
//     }
//   return (
//     <div className='w-full h-screen p-5'>
//         <h2 className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>
//           <span className='text-[#808080d7]'>Shop</span>Motto
//         </h2>
//         <div className='ml-10 mt-8 px-1 py-2.5 rounded-full bg-white w-12' onClick={()=> navigate('/')}>
//             <IoMdArrowBack className='w-10 h-7' />
//         </div>
//         <div className='w-full mt-3 flex justify-center items-center '>
//             <form action="" 
//             onSubmit={handleSignUp}
//             className='bg-[#FFFFFF] w-full md:w-[40%] text-center px-8 py-5 rounded shadow-2xl shadow-gray'
//             >
//       <h1 className='text-3xl font-semibold mb-5'>Register</h1>
//       <div className='flex flex-col gap-5 '>
//         <div className='flex flex-col items-start'>
//             <label htmlFor="" className='font-medium'>Name</label>
//             <input
//                 type="text" 
//                 className='border-1 border-[#aaa9a9] text-xl rounded-sm outline-none w-full p-2'
//                 placeholder='Enter your name'
//                 required
//                 onChange={(e)=> setName(e.target.value)}
//                 value={name}
//              />
//         </div>
//         <div className='flex flex-col items-start'>
//             <label htmlFor="" className='font-medium'>Email</label>
//             <input 
//                 type="email" 
//                 className='border-1 border-[#aaa9a9] text-xl rounded-sm outline-none w-full p-2'
//                 placeholder='Enter your email'
//                 required
//                 onChange={(e)=>setEmail(e.target.value)}
//                 value={email}
//             />
//         </div>
//         <div className='flex flex-col items-start'>
//             <label htmlFor="" className='font-medium'>Password</label>
//             <input 
//                 type="password" 
//                 className='border-1 border-[#aaa9a9] text-xl rounded-sm outline-none w-full p-2'
//                 placeholder='Enter your password'
//                 required
//                 // autoComplete="new-password"
//                 onChange={(e)=> setPassword(e.target.value)}
//                 value={password}
//             />
//         </div>
//       </div>
//         <button className='px-5 py-3 bg-zinc-700 rounded-md font-medium w-full mt-4 text-xl text-white mb-1'>{loading ? <Loader /> : "signUp"}</button>
//         <p className='text-[15px] text-[gray]'>Already have an account? <span className='text-blue-900 cursor-pointer font-medium' onClick={()=> navigate('/login')}>Login</span></p>
//       </form>
//         </div>
      
//     </div>
//   )
// }

// export default Register



import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';


const Register = () => {

    let navigate = useNavigate()
    let [loading, setLoading] = useState(false)
    let [errorMsg, setErrorMsg] = useState("")   // <-- ERROR FIELD

    let { serverUrl } = useContext(authDataContext)
    let { userData, setUserData } = useContext(userDataContext)

    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMsg("")       // clear old error

        try {
            let result = await axios.post(
                serverUrl + "/api/auth/register",
                { name, email, password },
                { withCredentials: true }
            )

            setUserData(result.data)
            toast.success("Sign Up Successfully!")
            setLoading(false)
            navigate("/")

        } catch (error) {
            setLoading(false)

            // backend error catch
            let msg = error?.response?.data?.message || "Sign Up Failed!"
            setErrorMsg(msg)
            toast.error(msg)
            console.log(error);
        }
    }

    return (
        <div className='w-full h-screen p-5'>
            <h2 className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                <span className='text-[#808080d7]'>Shop</span>Motto
            </h2>

            <div className='ml-10 mt-8 px-1 py-2.5 rounded-full bg-white w-12' onClick={() => navigate('/')}>
                <IoMdArrowBack className='w-10 h-7' />
            </div>

            <div className='w-full mt-3 flex justify-center items-center'>
                <form
                    onSubmit={handleSignUp}
                    className='bg-[#FFFFFF] w-full md:w-[40%] text-center px-8 py-5 rounded shadow-2xl shadow-gray'
                >
                    <h1 className='text-3xl font-semibold mb-5'>Register</h1>

                    {/* ERROR MESSAGE */}
                    {errorMsg && (
                        <p className="text-red-600 text-md font-medium mb-4">{errorMsg}</p>
                    )}

                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col items-start'>
                            <label className='font-medium'>Name</label>
                            <input
                                type="text"
                                className='border-1 border-[#aaa9a9] text-xl rounded-sm outline-none w-full p-2'
                                placeholder='Enter your name'
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className='flex flex-col items-start'>
                            <label className='font-medium'>Email</label>
                            <input
                                type="email"
                                className='border-1 border-[#aaa9a9] text-xl rounded-sm outline-none w-full p-2'
                                placeholder='Enter your email'
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className='flex flex-col items-start'>
                            <label className='font-medium'>Password</label>
                            <input
                                type="password"
                                className='border-1 border-[#aaa9a9] text-xl rounded-sm outline-none w-full p-2'
                                placeholder='Enter your password'
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    </div>

                    <button className='px-5 py-3 bg-zinc-700 rounded-md font-medium w-full mt-4 text-xl text-white mb-1'>
                        {loading ? <Loader /> : "Sign Up"}
                    </button>

                    <p className='text-[15px] text-[gray]'>
                        Already have an account?{" "}
                        <span className='text-blue-900 cursor-pointer font-medium' onClick={() => navigate('/login')}>
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
