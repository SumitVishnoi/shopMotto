import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import RelatedProduct from '../components/RelatedProduct';

const ProductDetail = () => {
    const {productId} = useParams()
    const {products, currency, addtoCart} = useContext(ShopDataContext)
    let [productData, setProductData] = useState(false)
    let [image, setImage] = useState('')
    let [image1, setImage1] = useState('')
    let [image2, setImage2] = useState('')
    let [image3, setImage3] = useState('')
    let [image4, setImage4] = useState('')
    let [size, setSize] = useState('')

    const fetchProducts = async () => {
        products.map((item)=> {
            if(item._id === productId) {
                setProductData(item)
                setImage1(item.image1)
                setImage2(item.image2)
                setImage3(item.image3)
                setImage4(item.image4)
                setImage(item.image1)

                return null;
            }
        })
    }

    useEffect(()=> {
        fetchProducts()
    },[productId, products])
  return productData ? (
    <div className='min-h-screen bg-[#E8E8E8] w-full'>
        <div className='flex items-center w-full flex-wrap p-5'>
            <div className="leftdiv flex flex-col-reverse md:flex-row justify-center items-center gap-4 w-full md:w-[40%] p-3 rounded-lg">
  
  {/* Thumbnails */}
  <div className="flex md:flex-col flex-row flex-wrap justify-center gap-3">
    <img
      src={image1}
      className="cursor-pointer w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[80px] md:h-[80px] rounded "
      onClick={() => setImage(image1)}
    />
    <img
      src={image2}
      className="cursor-pointer w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[80px] md:h-[80px] rounded "
      onClick={() => setImage(image2)}
    />
    <img
      src={image3}
      className="cursor-pointer w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[80px] md:h-[80px] rounded "
      onClick={() => setImage(image3)}
    />
    <img
      src={image4}
      className="cursor-pointer w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[80px] md:h-[80px] rounded "
      onClick={() => setImage(image4)}
    />
  </div>

  {/* Main Image */}
  <div className="w-full md:w-[350px] h-auto md:h-[380px] rounded bg-amber-200">
    <img src={image} alt="" className="w-full h-full rounded" />
  </div>
</div>

            <div className='rightdiv md:w-[60%] w-full flex flex-col gap-2'>
                <h2 className='font-semibold text-2xl'>{productData.name.toUpperCase()}</h2>
                <div className='flex items-center gap-2 text-yellow-600'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStarHalfStroke />
                </div>
                <p className='font-semibold text-xl'>{currency} {productData.price}</p>
                <p className='md:w-[400px] '>{productData.description}</p>
                <p className='font-medium'>Select Size</p>
                <div className='flex items-center gap-3'>
                    {productData.sizes.map((item,index)=> (
                        <button key={index} className={`w-[50px] h-[40px] bg-white rounded cursor-pointer ${item === size ? 'bg-zinc-700 font-medium text-white' : ''}`} onClick={()=>setSize(item)}>{item}</button>
                    ))}
                </div>
                <button onClick={()=>addtoCart(productData._id, size)} className='bg-zinc-700 font-medium text-white py-2 w-[40%] flex justify-center rounded-md active:bg-zinc-500 cursor-pointer'>Add To Cart</button>
                <div className='h-[1px] bg-slate-400'></div>
                <div className='leading-4.5'>
                    <p>100% Orginal Product</p>
                    <p>Cash on delivery is available on this product</p>
                    <p>East return and exchange policy within 7 days</p>
                </div>
            </div>
        </div>

        <div className=' w-full md:p-10 p-5'>
            <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>
        </div>
    </div>
  )
   :
  <div>No Products available</div>
}

export default ProductDetail