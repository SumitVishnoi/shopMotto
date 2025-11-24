import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopDataContext } from '../context/ShopContext'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'


const cashfreeCheckout = async (sessionId) => {
  const cashfree = new window.Cashfree({
    mode: process.env.REACT_APP_CF_MODE === "TEST" ? "sandbox" : "production",
  });

  cashfree.checkout({
    paymentSessionId: sessionId,
    redirectTarget: "_self",
  });
};



const PlaceOrder = () => {
  const navigate = useNavigate()
  let [method, setMethod] = useState("")
  const {cartItem, setCartItem, getCartAmount, delivery_fee, products} = useContext(ShopDataContext)
  const {serverUrl} = useContext(authDataContext)
  const {userData} = useContext(userDataContext)

  let [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    pincode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (e)=> {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({...data, [name]:value}))
  }

  const onSubmitHandler = async (e)=> {
    e.preventDefault()
    try {
      let orederItems = []
      for(const items in cartItem) { 
        for(const item in cartItem[items]) {
          if(cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orederItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        userId: userData?._id,
        address: formData,
        items: orederItems,
        amount:getCartAmount() + delivery_fee,
        paymentMethod: method 
      }
      
      switch(method) {
        case 'cod':
          const result = await axios.post(`${serverUrl}/api/order/placeorder`,
            orderData,
            {withCredentials:true}
          )
          console.log(result.data)
          if(result.data) {
            setCartItem({})
            navigate("/order")
          } else {
            console.log(result.data.message)
          }
          break;

        case "online":
  const paymentRes = await axios.post(
    `${serverUrl}/api/payment/cashfree/create`,
    {
      orderAmount: orderData.amount,
      customerId: userData?._id,
      customerPhone: formData.phone,
      customerEmail: formData.email,
    }
  );

  const sessionId = paymentRes.data.payment_session_id;

  // open Cashfree popup
  cashfreeCheckout(sessionId);
  break;


          default:
            break;
          
      }
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <div className='bg-[#E8E8E8] '>
      <form action="" onSubmit={onSubmitHandler} className='flex flex-wrap gap-3 justify-between w-full p-2 md:p-5'>
        <div className='md:ml-20'>
            <div className='mb-4 '>
            <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='md:flex-row flex flex-col w-full justify-between gap-2 '>
              <input required type="text" placeholder='First name' onChange={onChangeHandler} name='firstName' value={formData.firstName} className='p-2 bg-[#9F9FA9] rounded'/>
              <input required type="text" placeholder='Last name' onChange={onChangeHandler} name='lastName' value={formData.lastName} className='p-2 bg-[#9F9FA9] rounded'/>
            </div>
            <div>
              <input required type="email" placeholder='Email address' onChange={onChangeHandler} name='email' value={formData.email} className='p-2 bg-[#9F9FA9] rounded w-full'/>
            </div>
            <div>
              <input required type="text" placeholder='Street' onChange={onChangeHandler} name='street' value={formData.street} className='p-2 bg-[#9F9FA9] rounded w-full'/>
            </div>
            <div className='md:flex-row flex flex-col justify-between gap-2'>
              <input required type="text" placeholder='City' onChange={onChangeHandler} name='city' value={formData.city} className='p-2 bg-[#9F9FA9] rounded'/>
              <input required type="text" placeholder='State' onChange={onChangeHandler} name='state' value={formData.state} className='p-2 bg-[#9F9FA9] rounded'/>
            </div>
            <div className='md:flex-row flex flex-col gap-2 justify-between'>
              <input required type="text" placeholder='Pincode' onChange={onChangeHandler} name='pincode' value={formData.pincode} className='p-2 bg-[#9F9FA9] rounded'/>
              <input required type="text" placeholder='Country' onChange={onChangeHandler} name='country' value={formData.country} className='p-2 bg-[#9F9FA9] rounded'/>
            </div>
            <div>
              <input required type="text" placeholder='Phone' onChange={onChangeHandler} name='phone' value={formData.phone} className='p-2 bg-[#9F9FA9] rounded w-full'/>
            </div>
          </div>
          
      </div>
      <div className='md:w-[50%] flex flex-col gap-3'>
        <div> 
          <CartTotal />
        </div>
        <div className='flex flex-col gap-3 '>
          <div>
            <Title text1={"PAYMENT"} text2={"METHOD"}/>
          </div>
          <div className=' md:w-[60%] flex gap-5'>
            {/* <p
              onClick={() => setMethod("online")}
              className={`px-6 py-3 bg-white font-medium rounded cursor-pointer ${
                method === "online" ? "bg-zinc-700 text-white" : ""}`}
            >
              Pay Online
            </p> */}
            <p onClick={()=>setMethod("cod")} className={`px-4 py-3 bg-white font-medium rounded cursor-pointer ${method === 'cod' ? "bg-zinc-700 text-white" : ""}`}>CASH ON DELIVERY</p>
          </div>
          <button type='submit' className='md:w-[60%] rounded-full bg-zinc-700 text-white font-medium px-12 py-3 cursor-pointer'>Place Order</button>
        </div>
      </div>
      </form>
    </div>
  )
}

export default PlaceOrder



