import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({image, name, price, id}) => {
  const navigate = useNavigate()
  return (
    <div className='bg-zinc-400 w-[270px] p-5 flex flex-col gap-3 rounded-lg hover:scale-97 shadow-lg shadow-zinc-600' onClick={()=>navigate(`/productDetail/${id}`)}>
        <img className='w-[250px] h-[270px] rounded' src={image} alt="cards" />
      <div>
        <p>{name}</p>
        <p className='font-medium'>₹{price}/-</p>
      </div>
    </div>
  )
}

export default Card
