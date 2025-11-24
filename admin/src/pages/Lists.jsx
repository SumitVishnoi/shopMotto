import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { AuthDataContext } from '../context/AuthContext'
import { IoClose } from "react-icons/io5";

const Lists = () => {
  const [list, setList] = useState([])
  const {serverUrl} = useContext(AuthDataContext)

  const fetchList = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`,
        {withCredentials:true}
      )
      setList(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
      toast.error("Products loaded failed!")
    }
  }

  const removeList = async (id) => {
    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`,
        {},
        {withCredentials: true}
      )

      if(result.data) {
        fetchList()
        toast.success("Product Deleted!")
      }
      else {
        console.log(result.data)
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!");
    }
  }

  useEffect(()=> {
    fetchList()
  }, [])
  return (
    <div className='bg-[#E8E8E8] w-full overflow-x-hidden'>
      <Nav />
      <div className='flex'>
      <Sidebar />

      <div className='p-5 w-full flex flex-col items-center gap-5'>
        <h1 className='text-3xl font-semibold'>All Listed Products</h1>

        {
        list?.length > 0 ? (
          list.map((item, index)=>(
            <div key={index} className='bg-zinc-400 w-[90%] rounded-lg flex flex-wrap md:gap-5 p-2'>
                <div className='md:h-[150px] md:w-[150px] rounded overflow-hidden '>
              <img src={item.image1} alt="" className='w-full h-full object-fill' />
              </div>
              <div className='flex flex-col gap-1 w-[60%] py-2'>
                <h3 className='text-xl font-medium '>{item.name}</h3>
                <h4 className='text-[18px]'>{item.category}</h4>
                <h4 className='font-bold text-xl'>₹{item.price}/-</h4>
              </div>
              <div className='flex justify-end w-[20%]'>
                <button type='button' className='bg-zinc-300 h-[40px] flex items-center justify-center rounded-full cursor-pointer' onClick={()=>removeList(item._id)}><IoClose className='h-[20px] w-[40px]'/></button>
              </div>
              </div>

          ))
        ) 
        :
        <div>No product is available</div>
        }
      </div>

      </div>
    </div>
  )
}

export default Lists
