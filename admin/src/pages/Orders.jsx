import React from 'react'
import { useState } from 'react'
import { AuthDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useEffect } from 'react'
import Nav from '../components/Nav'
import { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import { FaDatabase } from "react-icons/fa6";

const Orders = () => {
  let [orders, setOrders] = useState([])
  let {serverUrl} = useContext(AuthDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/list`,
        {},
        {withCredentials:true}
      )
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/status`,
        {orderId, status: e.target.value},
        {withCredentials: true}
      )
      if(result.data) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    fetchAllOrders()
  }, [])
  return (
    <div className='bg-[#E8E8E8]'>
      <Nav />
      <div className='flex gap-5'>
        <Sidebar />
      <div className='md:p-5 p-2 font-medium w-full'>
        <h2 className='text-4xl mb-10'>All Orders List</h2>
        {
          orders.map((order, index)=> (
            <div key={index} className='bg-[#9F9FA9] shadow-lg shadow-black rounded-md p-2 mb-5 w-full md:flex-row flex flex-col md:items-center justify-between'>
              <div className='flex items-center'>
                <FaDatabase className='w-15 h-15'/>
              </div>
              <div>
                <h3 className='text-[#393939]'>Products:</h3>
                {
                  order.items.map((item, index)=> {
                    if(index === order.items.length - 1) {
                      return <p>{item.name.toUpperCase()} * {item.quantity} <span>{item.size}</span></p>
                    } else {
                      return <p>{item.name.toUpperCase()} * {item.quantity} <span>{item.size}</span>,</p>
                    }
                  })
                }
              </div>
              <div>
                <h3 className='text-[#393939]'>Address:</h3>
                <p>{`${order.address.firstName} ${order.address.lastName}`}</p>
                <p>{order.address.street},</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.pincode}`}</p>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <h3 className='text-[#393939]'>Details:</h3>
                <p>Items: {order.items.length}</p>
                <p>Items: {order.paymentMethod}</p>
                <p>Items: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className='text-[20px] text-white'>₹ {order.amount}</p>
              </div>
              <select value={order.status} onChange={(e)=>statusHandler(e, order._id)} className='bg-zinc-700 text-white rounded p-1 outline-none'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
      </div>
    </div>
  )
}

export default Orders
