import React from 'react'
import Input from './Input'

const PersonForm = (props) => {
    const {name, number, handleNumberChange, handleNameChange, handleFormSubmission} = props
  
    return (
        <div>
          <h3>add a new</h3>
          <form onSubmit={handleFormSubmission}>
            <Input text = "name: " value = {name} handleChange = {handleNameChange} />
            <Input text = "number: " value = {number} handleChange = {handleNumberChange} />
            <div>
              <button type="submit">add</button>
            </div>
          </form>
        </div>
    )
}

export default PersonForm
  