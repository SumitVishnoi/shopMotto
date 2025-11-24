import React from 'react'
import Title from '../components/Title'
import pic from '../assets/pic.jpg'

const About = () => {
  return (
    <div className='bg-[#E8E8E8] flex flex-col items-center gap-10 overflow-x-hidden w-full p-10'>
      <p>
        <Title text1={"ABOUT"} text2={"US"}/>
      </p>

      <div className='flex flex-wrap justify-between items-center md:gap-5 overflow-x-hidden w-full'>
        <img src={pic} alt="" className='md:w-[500px] h-[250px] rounded'/>
        <div className='md:w-[700px] w-full flex flex-col flex-wrap gap-5 p-1'>
          <p>Welcome to ShopMotto, your trusted online shopping destination.
At ShopMotto, we believe shopping should be more than just buying products—it should be an experience built on trust, comfort, and satisfaction. That’s why we created a platform that puts you, the customer, at the heart of everything we do.
</p>
<h3 className='font-medium text-xl'>Our Motto</h3>
<p>At ShopMotto, your trust is our motto. Every product, every service, and every promise we make is centered around creating a shopping experience where you feel safe, valued, and cared for.</p>
        </div>
      </div>

      <div className='flex flex-col items-center gap-10 md:p-5 overflow-x-hidden'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
        <div className='md:flex block items-center'>
          <div className='rounded md:p-5 md:w-[360px] w-full flex flex-col gap-2 items-center border-2 border-[black]'>
            <h4 className='font-medium text-xl'>Quality Assurance</h4>
            <p>We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
          </div>
          <div className='rounded md:p-5 md:w-[360px] w-full flex flex-col gap-2 items-center border-2 border-[black]'>
            <h4 className='font-medium text-xl'>Quality Assurance</h4>
            <p>We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
          </div>
          <div className='rounded md:p-5 md:w-[360px] w-full flex flex-col gap-2 items-center border-2 border-[black]'>
            <h4 className='font-medium text-xl'>Quality Assurance</h4>
            <p>We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
