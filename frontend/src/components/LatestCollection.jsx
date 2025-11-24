import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import Title from './Title'
import { ShopDataContext } from '../context/ShopContext'

const LatestCollection = () => {
    const {products} = useContext(ShopDataContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(()=> {
        setLatestProducts(products.slice(0,6))
    },[products])
  return (
    <div className='p-5 flex flex-col gap-5'>
        <div className='flex justify-center'>
        <Title text1={"Latest"} text2={"Collections"}/>
        </div>
        <div className='flex flex-wrap justify-center gap-5'>
          {
          latestProducts.map((item, index)=>(
            <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price}/>
          ))
        }
        </div>
      
    </div>
  )
}

export default LatestCollection
