import React, { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'

import { useStateContext } from '../context'
import { money } from '../assets'
import { CustomButton, FormField, Loader } from '../components'
import { checkIfImage } from '../utils'

const CreateCampaign = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { createCampaign } = useStateContext()
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  })

  const handleFormFieldChange = (fieldName, event) => {
    setForm({ ...form, [fieldName]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false)
        navigate('/')
        // console.log(form)
      } else {
        alert('Invalid image URL')
        setForm({ ...form, image: '' })
      }
    })
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className='font-monserrat font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[38px]'>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName='Your Name *'
            placeholder="John Appleseed"
            inputType='text'
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName='Campaign Title *'
            placeholder="An awesome campaign"
            inputType='text'
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
            labelName='Story *'
            placeholder="Your story here"
            isTextArea={true}
            inputType='text'
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
        />


        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName='Goal *'
            placeholder="ETH 0.5"
            inputType='text'
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName='End date *'
            placeholder="Deadline"
            inputType='date'
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
          <FormField
            labelName='Campaign Image *'
            placeholder="Some images for your campaign"
            inputType='url'
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />
        </div>

        <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
          <img src={money} alt='money' className='w-[40px] h-[40px] object-contain'/>
          <h4 className='font-monserrat font-bold text-white text-[25px] ml-[20px]'>You will get 100% of the amount donated</h4>
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btntype="submit"
            title="Submit your Campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign