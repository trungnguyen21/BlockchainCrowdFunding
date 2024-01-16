import React from 'react'

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange }) => {
  return (
    <label className='flex-1 w-full flex flex-col'>
      {labelName && (
        <span className='font-monserrat font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]'>{labelName}</span>
      )}
      {isTextArea ? (
        <textarea
          required 
          value={value} 
          onChange={handleChange} 
          rows={10}
          className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-monserrat text-white text-[14px] placeholder:text-[#3b5264] roudned-[10px] sm:min-w-[380px]' 
        />
      ) : (
        <input 
          required 
          value={value} 
          onChange={handleChange} 
          type={inputType} 
          placeholder={placeholder}
          step="0.1"
          className='py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-monserrat text-white text-[14px] placeholder:text-[#3b5264] roudned-[10px] sm:min-w-[380px]' 
        />
      )}
    </label>
  )
}

export default FormField