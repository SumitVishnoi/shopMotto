import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { ShopDataContext } from '../context/ShopContext';
import Title from '../components/Title';
import Card from '../components/Card';

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false)
  const {products, search, showSearch} = useContext(ShopDataContext)
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relvent")

  const sortProducts = (e)=> {
    let fbCopy = filterProduct.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProduct(fbCopy.sort((a,b)=>(a.price - b.price)))
        break;
      case 'high-low':
        setFilterProduct(fbCopy.sort((a,b)=>(b.price - a.price)))
        break;
    
      default:
        applyFilter()
        break;
    }
  }

  const toggleCategory = (e)=> {
    if(category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item=> item !== e.target.value))
    } else {
      setCategory(prev=> [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e)=> {
    if(subCategory.includes(e.target.value)) {
      setSubCategory(prev=>prev.filter(item=> item !== e.target.value))
    } else {
      setSubCategory(prev=> [...prev, e.target.value])
    }
  }

  const applyFilter = ()=>{
    let productCopy = products.slice()

    if(showSearch && search) {
      productCopy = productCopy.filter(item=>  item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0) {
      productCopy = productCopy.filter(item=> category.includes(item.category))
    }
    setFilterProduct(productCopy)
  }

  useEffect(()=> {
    sortProducts()
  },[sortType])

  useEffect(()=> {
    setFilterProduct(products)
  },[products])

  useEffect(()=> {
    applyFilter()
  },[category, subCategory, search, showSearch])
  return (
    <div className='bg-[#E8E8E8] md:flex justify-between block w-full overflow-x-hidden'>
      <div className='bg-[#9F9FA9] md:w-[300px] w-full'>
        <div className={`border-r-1  ${showFilter ? "h-[45vh]" : "h-[8vh]"} md:h-full p-3 flex flex-col gap-2`}>
          <h2 className='font-semibold text-2xl flex items-center gap-2' onClick={()=>setShowFilter(prev=>!prev)}>FILTERS
          {!showFilter && <IoIosArrowForward className='text-zinc-600 md:hidden'/>}
          {showFilter && <IoIosArrowDown className='text-zinc-600 md:hidden'/>}
          </h2>
          <form className={`category w-[200px] border-2 border-zinc-900 text-white md:block gap-2 p-3 rounded-lg bg-zinc-700 ${showFilter ? "" : "hidden"}`}>
            <h3 className=' font-medium'>CATEGORIES</h3>
            <div className='flex gap-2'>
              <input type="checkbox" className='cursor-pointer' value={'Men'} onChange={toggleCategory}/>
            <span>Men</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" className='cursor-pointer' value={'Women'} onChange={toggleCategory}/>
            <span>Women</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" className='cursor-pointer' value={'kids'} onChange={toggleCategory}/>
            <span>Kids</span>
            </div>
          </form>
          <form className={`subcategory w-[200px] border-2 border-zinc-900 text-white md:block gap-2 p-3 rounded-lg bg-zinc-700 ${showFilter ? "" : "hidden"}`}>
            <h3 className='text- font-medium'>SUB-CATEGORIES</h3>
            <div className='flex gap-2'>
              <input type="checkbox" className='cursor-pointer' value={'Top-wear'} onChange={toggleSubCategory}/>
            <span>Top-wear</span>
            </div>
            <div className='flex gap-2'>
              <input type="checkbox" className='cursor-pointer' value={'Bottom-wear'} onChange={toggleSubCategory}/>
            <span>Bottom-wear</span>
            </div>
          </form>
      </div>
      </div>

      <div className='collections w-full'>
        <div className='flex justify-between flex-wrap w-full p-2 md:p-5'>
          <Title text1={"ALL"} text2={"COLLECTIONS"}/>
          <select name='sort' onChange={(e)=>setSortType(e.target.value)} className='bg-zinc-700 text-white font-medium rounded outline-none p-1'>
            <option value="relevent">Relevent</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        <div className='flex flex-wrap justify-center gap-3 mb-5'>
          {
            filterProduct.map((item, index)=> (
              <Card key={index} name={item.name} id={item._id} image={item.image1} price={item.price}/>
            ))
          }
        </div>
      </div>
      
    </div>
  )
}

export default Collection
