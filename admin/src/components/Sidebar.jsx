import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io"; 
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div className='w-[40%] md:w-[20%] min-h-screen bg-zinc-400 border-r-1 border-r-gray-500'>
      <div className='flex flex-col gap-4 items-end py-10'>
        <button onClick={()=> navigate("/add") } className=' flex flex-wrap gap-2 items-center justify-center text-white font-medium border-r-0 p-2 bg-zinc-700 rounded-tl rounded-bl hover:text-black hover:bg-white cursor-pointer'>
          <IoMdAddCircleOutline className='w-[22px] h-[22px]'/>
          <p className='hidden md:block '>Add items</p>
        </button>
        <button onClick={()=> navigate("/lists")} className='flex flex-wrap gap-2 items-center text-white font-medium border-r-0 p-2 bg-zinc-700 rounded-tl rounded-bl hover:text-black hover:bg-white cursor-pointerg'>
          <FaRegListAlt className='w-[22px] h-[22px]'/>
          <p className='hidden md:block'>List items</p>
        </button>
        <button onClick={()=> navigate("/orders")} className='flex flex-wrap gap-2 items-center text-white font-medium border-r-0 p-2 bg-zinc-700 rounded-tl rounded-bl hover:text-black hover:bg-white cursor-pointerg'>
          <IoMdCheckmarkCircleOutline className='w-[22px] h-[22px]'/>
          <p className='hidden md:block'>View items</p>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
