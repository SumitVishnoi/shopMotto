import React, { useContext, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import { FaHome, FaBoxOpen, FaShoppingCart, FaUser } from "react-icons/fa";
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { ShopDataContext } from '../context/ShopContext';
import { TiShoppingCart } from "react-icons/ti";


const Nav = () => {
  let {showSearch, setShowSearch, search, setSearch, getCartCount} = useContext(ShopDataContext)
  let navigate = useNavigate()
  let {serverUrl} = useContext(authDataContext)
  let {userData, setUserData} = useContext(userDataContext)

  const handleLogout = async (e)=> {
    try {
        e.preventDefault()
      let result = await axios.get(`${serverUrl}/api/auth/logout`,
        {withCredentials: true})
        setUserData(null)
        getCurrentUser()
        console.log(result.data);

    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    // <div className='w-full'>
    //   <div className='flex justify-between items-center px-2 md:px-5 py-5 bg-[#fff] w-full'>
    //   <h2 className='text-3xl font-bold items-center text-[#4F46E5]'>ShopMotto</h2>
      
    //   <div className='border-2 border-zinc-700 hidden md:flex gap-2 items-center rounded-full px-4 py-2 cursor-pointer'>
    //     <IoSearch onClick={()=>{setShowSearch(prev=>!prev); navigate("/collection")}}/>
    //    <div className='group relative'>
    //      <FiMenu className='w-4 h-4'/>
    //      <div className='group-hover:block hidden absolute dropdown-menu bg-slate-100 top-4 right-3 px-12 py-3 cursor-pointer'>
    //       <ul>
    //         <li className='hover:font-medium ' onClick={()=>navigate("/")}>Home</li>
    //         <li className='hover:font-medium ' onClick={()=>navigate("/about")}>About</li>
    //         <li className='hover:font-medium ' onClick={()=>navigate("/collection")}>Collection</li>
    //         <li className='hover:font-medium ' onClick={()=>navigate("/contact")}>Contact</li>
    //       </ul>
    //     </div>
    //    </div>

    //     <div className='group relative'>
    //       {userData != null && <div className='w-[30px] h-[30px] bg-zinc-800 text-white rounded-full flex justify-center items-center text-center'>
    //         {userData?.name ? userData.name.slice(0, 1).toUpperCase() : 'U'}
    //     </div>}
        
    //       {userData == null && <CgProfile className='w-4 h-4'/>}
    //      <div className='group-hover:block hidden absolute dropdown-menu top-3 right-1 px-5 py-3 rounded '>
    //         <ul className='bg-slate-100 px-10 py-3 cursor-pointer '>
    //           {!userData && <li className='hover:bg-slate-200 rounded hover:px-2 ' onClick={()=> navigate('/login')}>Login</li>}
    //           {userData && <li className='hover:bg-slate-200 rounded hover:px-2' onClick={handleLogout}>Logout</li>}
    //           <div className='border-t-1 w-full border-gray-300 mt-2'>
    //           <li className='mt-2'><button className='px-3 py-2 bg-[#d1d1d1] text-[15px] rounded font-medium cursor-pointer'>Register</button></li></div>
    //         </ul>
    //       </div>
    //    </div>
    //   </div>
      
    // </div>
    // {showSearch && <div className='bg-white h-15 flex justify-center items-center border-t-1 border-t-zinc-200'>
    //   <p className='bg-[#4F46E5] py-3.5 px-3 text-white rounded-l'><IoSearch /></p>
    //   <input type="text" onChange={(e)=>setSearch(e.target.value)} value={search} className='border-2 border-black w-[30%] rounded-r p-2 font-medium outline-none' placeholder='Search'/>
    // </div>}
    // </div>
    //------------------------------------------------------------------------------------------

    <div className="w-full">
      {/* Top Navigation - Desktop/Tablet */}
      <div className="flex justify-between items-center px-2 md:px-5 py-5 bg-white w-full shadow-md">
        <h2 className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          <span className='text-[#808080d7]'>Shop</span>Motto
        </h2>
        

        <div className="hidden md:flex gap-3 items-center">
          {/* Search */}
          <div className="flex items-center rounded-full md:px-0 px-4 py-1 cursor-pointer">
            <IoSearch className='w-6 h-6' onClick={()=>{setShowSearch(prev=>!prev); navigate("/collection")}} />
          </div>

          {/* Menu Dropdown */}
          <div className="relative group">
            <FiMenu className="w-5 h-5 cursor-pointer" />
            <div className="hidden group-hover:block absolute top-1 right-4 mt-2 bg-slate-100 rounded shadow-lg z-10">
              <ul className="p-4">
                <li className="hover:font-medium py-1 cursor-pointer" onClick={() => navigate("/")}>Home</li>
                <li className="hover:font-medium py-1 cursor-pointer" onClick={() => navigate("/about")}>About</li>
                <li className="hover:font-medium py-1 cursor-pointer" onClick={() => navigate("/collection")}>Collection</li>
                <li className="hover:font-medium py-1 cursor-pointer" onClick={() => navigate("/contact")}>Contact</li>
              </ul>
            </div>
          </div>

          {/* Cart */}
          <div className='hidden md:flex cursor-pointer relative'>
          <span className='absolute bg-amber-200 -top-3 -right-2 font-medium w-[20px] h-[20px] flex items-center justify-center rounded-full'>{getCartCount()}</span>
          <TiShoppingCart className='w-6 h-6' onClick={()=>navigate("/cart")}/>
          </div>

          {/* User Dropdown */}
          <div className="relative group cursor-pointer">
            {userData ? (
              <div className="w-8 h-8 bg-zinc-800 text-white rounded-full flex justify-center items-center">
                {userData.name ? userData.name[0].toUpperCase() : "U"}
              </div>
            ) : (
              <CgProfile className="w-5 h-5" />
            )}
            <div className="hidden group-hover:block absolute top-4 right-4 mt-2 bg-slate-100 rounded shadow-lg z-10">
              <ul className="p-4 ">
                {userData && (
                  <li className="hover:bg-gray-200 rounded px-2 py-1 " onClick={() => navigate("/order")}>Order</li>
                )}
                {!userData && (
                  // <li className="hover:bg-gray-200 rounded px-2 py-1" onClick={() => navigate("/login")}>Login</li>
                  <li className="mt-2">
                  <button className="px-3 py-2 bg-gray-300 rounded text-sm font-medium cursor-pointer" onClick={()=> navigate("/login")}>Login</button>
                </li>
                )}
                {userData && (
                  <li className="mt-2">
                  <button className="px-3 py-2 bg-gray-300 rounded text-sm font-medium cursor-pointer" onClick={handleLogout}>Logout</button>
                </li>
                )}
                
                
              </ul>
            </div>
          </div>

        </div>

        {/* Mobile Hamburger + Search */}
        <div className="flex md:hidden items-center gap-4">
          <IoSearch className="w-6 h-6" onClick={()=>{setShowSearch(prev=>!prev); navigate("/collection")}} />
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="bg-white flex justify-center items-center border-t border-gray-200 p-2 md:p-3">
          <p className="bg-[#4F46E5] py-2 px-3 h-[44px] text-white rounded-l">
            <IoSearch />
          </p>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="border-2 border-black w-[70%] md:w-[30%] rounded-r p-2 outline-none font-medium"
            placeholder="Search"
          />
        </div>
      )}

      {/* Bottom Navigation - Mobile */}
      <div className="fixed bottom-0 w-full bg-white shadow-md flex justify-around py-2 border-t border-gray-200 md:hidden z-10">
        <div className="flex flex-col items-center text-gray-700" onClick={() => navigate("/")}>
          <FaHome size={30} />
          <span className="text-sm">Home</span>
        </div>
        <div className="flex flex-col items-center text-gray-700" onClick={() => navigate("/collection")}>
          <FaBoxOpen size={30} />
          <span className="text-sm">Products</span>
        </div>
        <div className="flex flex-col items-center text-gray-700 relative" onClick={() => navigate("/cart")}>
          <span className='absolute bg-amber-200 -top-3 -right-2 font-medium w-[20px] h-[20px] flex items-center justify-center rounded-full text-[black]'>{getCartCount()}</span>
          <TiShoppingCart size={30} />
          <span className="text-sm">Cart</span>
        </div>
        <div className="flex flex-col items-center text-gray-700 ">
          <FaUser size={30} onClick={() => navigate("/contact")}/>
          <span className='text-sm'>contact</span>
          {/* <span className="text-xs">{userData ? userData.name[0].toUpperCase() : "Profile"}</span> */}
        </div>
      </div>
    </div>
  );
};



export default Nav










