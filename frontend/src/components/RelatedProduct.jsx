import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

const RelatedProduct = ({category, subCategory, currentProductId}) => {
    let {products} = useContext(ShopDataContext)
    let [related, setRelated] = useState([])

    useEffect(()=> {
        if(products.length > 0) {
            let productCopy = products.slice()
            productCopy = productCopy.filter((item)=> category === item.category)
            productCopy = productCopy.filter((item)=> subCategory === item.subCategory)
            productCopy = productCopy.filter((item)=> currentProductId !== item._id)
            setRelated(productCopy.slice(0, 4))
        }
    },[products, category, subCategory, currentProductId])
  return (
    <div className='flex flex-col gap-5 justify-center'>
        <div>
            <Title text1={"RELATED"} text2={"PRODUCTS"}/>
        </div>
        <div className='flex flex-wrap md:justify-start justify-center items-center gap-5'>
            {
                related.map((item, index)=> (
                    <Card key={index} name={item.name} price={item.price} id={item._id} image={item.image1}/>
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProduct