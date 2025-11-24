import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className='bg-zinc-700 text-white w-full mb-15 md:mb-0'>
     <div className='flex flex-wrap gap-5 justify-evenly items-center p-10 border-b-1 border-[black]'>
         <h1 className='font-semibold text-2xl'>ShopMotto</h1>
         <div className='flex flex-wrap justify-between items-center gap-10 '>
            <ul className='flex flex-col justify-center text-gray-400 items-center gap-1'>
                <h2 className='font-medium text-xl text-white'>Men's</h2>
                <li>Shirts</li>
                <li>Pants</li>
                <li>Shorts</li>
            </ul>
            <ul className='flex flex-col justify-center text-gray-400 items-center gap-1'>
                <h2 className='font-medium text-xl text-white'>Women's</h2>
                <li>Shirts</li>
                <li>Pants</li>
                <li>Shorts</li>
            </ul>
            <ul className='flex flex-col justify-center text-gray-400 items-center gap-1'>
                <h2 className='font-medium text-xl text-white'>Shoes</h2>
                <li>Shirts</li>
                <li>Pants</li>
                <li>Shorts</li>
            </ul>
         </div>
     </div>

     <div className='flex justify-between px-5 py-2 '>
        <p>Copyright 2025@shopMotto.com-All Rights Reserved</p>
        <div className='flex items-center gap-1'>
            <FaFacebookF /> 
            <AiFillInstagram />
        </div>
     </div>
    </div>
  )
}

export default Footer
