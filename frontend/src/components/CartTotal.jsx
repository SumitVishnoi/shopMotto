import React, { useContext } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopDataContext)
  return (
    <div className='w-full'>
        <div className='mb-5'>
            <Title text1={"CART"} text2={"TOTALS"}/>
        </div>
        <div className='border-2 w-full md:w-[60%] border-[black] rounded flex flex-col'>
            <div className='flex justify-between p-2 border-b-1 border-zinc-400'>
                <p className='font-medium'>Subtotal</p>
                <p className='font-semibold text-[18px]'>{currency} {getCartAmount()}.00</p>
            </div>
            <div className='flex justify-between p-2'>
                <p className='font-medium'>Shipping Fee</p>
                <p className='font-semibold text-[18px]'>{currency} {delivery_fee}</p>
            </div>
            <div className='flex justify-between border-t-2 border-zinc-900 bg-[#9F9FA9] p-2'>
                <p className='font-medium'>Total</p>
                <p className='font-semibold text-[18px]'>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</p>
            </div>
        </div>
    </div>
  )
}

export default CartTotal