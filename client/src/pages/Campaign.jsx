import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'

import { useStateContext } from '../context'
import { CustomButton, CountBox, Loader } from '../components'
import { calculateBarPercentage, daysLeft } from '../utils'
import { thirdweb } from '../assets'

const Campaign = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { donate, getDonations, contract, address } = useStateContext()

  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [donators, setDonators] = useState([])

  console.log(state)
  const remainDays = daysLeft(state.campaign.deadline)

  const handleDonate = async () => {
    setIsLoading(true)
    await donate(state.campaign.pId, amount)
    navigate('/')
    setIsLoading(false)

  }

  const fetchDonators = async () => {
    const data = await getDonations(state.campaign.pId)
    setDonators(data)
  }

  useEffect(() => {
    if(contract) fetchDonators()
  }, [contract, address])


  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.campaign.image} alt='campaign' className='w-full h-[400px] object-cover rounded-xl'/>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.campaign.target, state.campaign.amountCollected)}%`, maxWidth:'100%'}}></div>
          </div>
        </div>

        <div className="flex md:w-[120px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title='Days Left' value={remainDays} />
          <CountBox title={`Raised of ${state.campaign.target}`} value={state.campaign.amountCollected} />
          <CountBox title='Total donators' value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h1 className='font-monserrat font-semibold text-[24px] text-white text-left'>Creator</h1>
            <div className="flex flex-row justify-start my-[10px] w-full h-[50px] cursor-pointer">
              <img src={thirdweb} alt='profile' className='rounded-full bg-[#2c2f32] object-contain'/>
              <div className="flex flex-col justify-center text-white ml-[10px] font-monserrat">
                <p>{state.campaign.owner}</p>
                <p className='text-[12px] text-[#808191]'>Campaign Starter</p>
              </div>
            </div>
          </div>

          <div>
            <h1 className='font-monserrat font-semibold text-[24px] text-white text-left'>Story</h1>
            <div className="flex flex-row justify-start my-[10px] w-full h-[50px] cursor-pointer">
              <div className="flex flex-col justify-center text-[#808191] font-monserrat">
                <p>{state.campaign.description}</p>
              </div>
            </div>
          </div>

          <div>
            <h1 className='font-monserrat font-semibold text-[24px] text-white text-left'>Donators</h1>
            <div className="flex flex-row justify-start my-[10px] w-full h-[50px] cursor-pointer">
              {donators.length > 0 ? donators.map((item, index) => (
                <div key={`${item.donators}-${index}`} className="flex justify-between items-center gap-4">
                  <p className='font-monserrat font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all'>{index+1}. {item.donators}</p>
                  <p className='font-monserrat font-normal text-[16px] text-[#808191] leading-[26px] break-all'>{item.donation}</p>
                </div>
              )) : (<p className='font-monserrat font-[12px] text-[#808191]'>No donators yet</p>)}
            </div>
          </div>


        </div>
        <div className="flex-1">
          <h1 className='font-monserrat font-semibold text-[24px] text-white text-left'>Fund this campaign</h1>
          <div className="mt-[12px] flex flex-col bd-[#1c1c24] rounded-[10px]">
            <p className='font-monserrat font-medium mb-[10px] text-[#808191]'>Enter the amount you want to donate</p>
            <input type='number' 
              placeholder='0.1ETH' 
              step='0.01' 
              className='w-full py-[10px] sm:px-[20px] px-[25px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-monserrat text-white text-[18px] leading-[30px] placeholder:text-[#4d5264] rounded-[10px]'
              value={amount}
              onChange={(e) => setAmount(e.target.value)} 
            />
            <div className="mt-[20px] bg-[#131318] rounded-[10px]">
              <h4 className='font-monserrat font-medium text-center text-[#808191]'>Thank you for backing the campaign</h4>
              <CustomButton 
                btntype="button"
                title={"Fund this campaign"}
                styles={"w-full mt-[20px] bg-[#8c6dfd]"}
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Campaign