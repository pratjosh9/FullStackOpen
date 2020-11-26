import React from 'react'

const Input = (props) => {
    const {text, value, handleChange} = props
    return (
      <div>
        {text} <input value = {value} onChange = {handleChange} />
      </div>
    )
}

export default Input