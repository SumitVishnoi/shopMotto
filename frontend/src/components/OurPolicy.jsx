import React from 'react'
import { RiExchangeFundsFill } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import Title from './Title';


const OurPolicy = () => {
    // 
    // <TbRosetteDiscountCheckFilled />
    // <BiSupport />
  return (
    <div className='flex flex-col items-center gap-8 p-5'>
        <div className='flex flex-col items-center'>
            <Title text1={"OUR"} text2={"POLICY"}/>
            <p className='font-medium text-center'>Customer-friendly Policies - Committed to Your Satisfaction and Safety.</p>
        </div>
        <div className='flex flex-wrap gap-10 justify-center'>
            <div className='bg-[#9F9FA9] shadow-2xl shadow-[gray] cursor-pointer hover:shadow-black hover:scale-95 rounded p-5 w-[300px] flex flex-col gap-2 items-center'>
            <RiExchangeFundsFill className='w-12 h-10'/>
            <h3 className='text-xl font-medium'>Easy Exchange Policy</h3>
            <p className='text-center'>Shop with confidence with our easy and hassle-free exchange policy.</p>
        </div>
        <div className='bg-[#9F9FA9] shadow-2xl shadow-[gray] cursor-pointer hover:shadow-black hover:scale-90 rounded p-5 w-[300px] flex flex-col gap-2 items-center'>
            <TbRosetteDiscountCheckFilled className='w-12 h-10'/>
            <h3 className='text-xl font-medium'>7 Days Return Policy</h3>
            <p className='text-center'>Enjoy the freedom to return your products within 7 days, no questions asked.</p>
        </div>
        <div className='bg-[#9F9FA9] shadow-2xl shadow-[gray] cursor-pointer hover:shadow-black hover:scale-95 rounded p-5 w-[300px] flex flex-col gap-2 items-center'>
            <BiSupport className='w-12 h-10'/>
            <h3 className='text-xl font-medium'>Best Customer Support</h3>
            <p className='text-center'>We’re here for you 24/7 with our best-in-class customer support.</p>
        </div>
        </div>
    </div>
  )
}

export default OurPolicy