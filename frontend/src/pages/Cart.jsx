import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const {products, currency, cartItem, updateQuantity} = useContext(ShopDataContext)
    const [cartData, setCartData] = useState([])
    const navigate = useNavigate()

    useEffect(()=> {
        const tempData = []
        for(const items in cartItem) {
            for(const item in cartItem[items]) {
                if(cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item]
                    })
                }
            }
        }
        setCartData(tempData)
    }, [cartItem])
  return (
    <div className='bg-[#E8E8E8] pb-5'>
        <div className='p-10'>
            <Title text1={"YOUR"} text2={"CART"}/>
        </div>
        <div className='mb-5'>
            {
                cartData.map((item, index)=> {
                    const productData = products.find((product)=> product._id === item._id)
                    return (
                    <div key={index} className='flex justify-center p-3 '>
                        <div className='bg-[#9F9FA9] p-2 w-[90%] flex flex-wrap items-center gap-5 rounded-md shadow-md shadow-[black] relative'>
                            <img src={productData.image1} className='w-[100px] h-[100px] rounded' alt="" />
                            <div className='w-[200px] flex flex-col gap-1.5'>
                            <p>{productData.name}</p>
                            <p className='font-medium'>{currency} {productData.price}</p>
                            <p className='py-2 flex items-center justify-center rounded-md bg-zinc-700 text-white font-medium w-[50px]'>{item.size}</p>
                        </div>
                        <input type="number" min={1} defaultValue={item.quantity} className='w-[50px] border-2 border-zinc-950 rounded-md' onChange={(e)=> e.target.value === ' ' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}/>

                        <RiDeleteBin6Line onClick={()=> updateQuantity(item._id, item.size, 0)} className='w-12 h-6 cursor-pointer text-red-700 absolute top-10 right-5 md:top-[40%] md:right-10'/>
                        </div>
                    </div>
                )
                })
            }
        </div>

        <div>
            <div className='flex flex-col items-start gap-3 p-10 md:w-[50%]'>
            <CartTotal />
            <div className='w-full '>
                <button onClick={()=>
               { if(cartData.length > 0){
                    navigate("/placeorder")
                } else {
                    console.log("Your cart is empty!")
                }
            }} className='bg-zinc-700 text-white px-4 active:bg-zinc-500 cursor-pointer font-medium py-3 rounded-full '>PROCEED TO CHECKOUT</button>
            </div>
        </div>
        </div>
    </div>
    
  )
}

export default Cart