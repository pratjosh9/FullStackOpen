import React from 'react'
import Input from './Input'

const Filter = (props) => {
    const {filterText, handleFilterTextChange} = props
    return (
      <Input text = "filter shown with" value = {filterText} handleChange = {handleFilterTextChange} />
    )
}

export default Filter