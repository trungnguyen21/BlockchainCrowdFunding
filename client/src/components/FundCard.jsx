import React from 'react'
import { tagType, thirdweb } from '../assets'
import { daysLeft } from '../utils'

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick}) => {
  const remainDays = daysLeft(deadline)

  return (
    <div className='sm:w-[280px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer' onClick={handleClick}>
      <img src={image} alt='fund' className='w-full h-[160px] object-cover rounded-[15px]' />
      <div className="flex flex-col p-4">

        <div className="flex flex-row items-center mb-[18px]">
          <img src={tagType} alt='tag' className='w-[17px] h-[17px] object-contain'></img>
          <p className='ml-[12px] mt-[2px] font-monserrat font-semibold text-[14px] text-[#808191]'>
            Category
          </p>
        </div>

        <div className="block">
          <h3 className='font-monserrat font-semibold text-[16px] text-white text-white leading-[26px] truncate'>{title}</h3>
          <p className='mt-[5px] font-monserrat font-normal text-[#808191] text-left truncate'>{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[16px] gap-2">
          <div className="flex flex-col">
            <h4 className='font-monserrat font-semibold text-[14px] text-[#b2b3bd] leading-[20px]'>
              {amountCollected}
            </h4>
            <p className='mt-[3px] font-monserrat text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate'>Raised of {target} ETH</p>
          </div>
          <div className="flex flex-col">
            <h4 className='font-monserrat font-semibold text-[14px] text-[#b2b3bd] leading-[20px]'>
              {remainDays}
            </h4>
            <p className='mt-[3px] font-monserrat text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate'>Days left</p>
          </div>
        </div>
        
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={thirdweb} alt='thirdweb' className='w-1/2 h-1/2 object-contain'></img>
          </div>
          <p className='flex-1 font-monserrat font-normal text-[#808191] truncate'>{owner}</p>
        </div>

      </div>

    </div>
  )
}

export default FundCard