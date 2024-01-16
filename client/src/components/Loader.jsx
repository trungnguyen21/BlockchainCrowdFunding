import React from 'react'

import { loader } from '../assets'

const Loader = () => {
  return (
    <div className='fixed inset-0 z-100 h-screen bg-[rgba(0,0,0,0.75)] flex items-center justify-center flex-col'>
        <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain'/>
        <p className='mt-[20px] font-monserrat font-semibold text-[24px] text-white text-center'>Transaction in progress <br /> This might take up a few minutes</p>
    </div>
  )
}

export default Loader