import React from 'react'

const FormRow =({type,name,value,handleChange,labelText})=> {
  return (
    <div className='form-row'>
        <label htmlFor={labelText} className='form-label'>
            {labelText}
        </label>
        <input
            type={type}
            value={value}
            name={name}
            onChange={handleChange}
            className='form-input'
        />
    </div>
  )
}

export default FormRow
