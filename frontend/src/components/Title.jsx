import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div>
        <p className='flex gap-2'>
            <span className='text-3xl font-semibold'>{text1}</span>
            <span className='text-3xl font-semibold text-[#808080d7]'>{text2}</span>
        </p>
    </div>
  )
}

export default Title