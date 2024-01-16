import React from 'react'
import { useNavigate } from 'react-router-dom'

import { loader } from '../assets'
import { FundCard } from './'

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
    const navigate = useNavigate()
    return (
        <div>
            <div>
                <h1 className='font-monserrat font-semitbold text-[16px] text-white text-left'>{title} ({campaigns.length})</h1>
            </div>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
                    <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain' />
                )}
                {!isLoading && campaigns.length === 0 && (
                    <p className='font-monserrat font-semibold text-[14px] leading-[30px] text-[#818183]'>
                        You have not created any campaigns
                    </p>
                )}

                {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard key={campaign.id}
                    {...campaign}
                    handleClick = {() => navigate(`/campaign-detail/${campaign.title}`, { state: { campaign } })}
                />)}
            </div>

        </div>
    )
}

export default DisplayCampaigns