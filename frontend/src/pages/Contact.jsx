import React from 'react'

const Contact = () => {
  return (
    <div className='bg-[#E8E8E8] flex flex-col items-center gap-3 p-5'>
     <div>
      <h2 className='text-3xl font-semibold'>Contact</h2>
     </div>
      
     <form action="" className='p-5 w-full md:w-[400px] flex flex-col gap-3 bg-[#9F9FA9] rounded-md'>
      <div className='flex flex-col'>
        <label htmlFor="name">Name</label>
      <input required type="text" name="name" id="name" className='p-1 border-1 border-zinc-700 rounded' />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="email">Email</label>
      <input required type="email" name="name" id="name" className='p-1 border-1 border-zinc-700 rounded' />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="area">Message</label>
        <textarea required name="message" id="area" className='border-1 border-zinc-700 rounded p-1'></textarea>
      </div>
      <button className='w-full py-3 bg-zinc-700 text-white font-medium rounded-lg'>Send</button>
     </form>
    </div>
  )
}

export default Contact
