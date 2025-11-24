// import React, { useContext } from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import Product from './Product'
import OurPolicy from '../components/OurPolicy'
// import { userDataContext } from '../context/UserContext'



const Home = () => {
  // let {userData} = useContext(userDataContext)
  return (
    <div className='bg-[#E8E8E8]'>
      <Banner />
      {/* {userData && <Hero />} */}
      <Product />
      <OurPolicy />
    </div>
  )
}

export default Home
