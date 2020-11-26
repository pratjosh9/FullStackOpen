import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/person'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(()=>{
    personService
      .getAll()
      .then(personList => setPersons(personList))
  }, [])

  const personsToDisplay = (filterText === '') ? persons 
                            : persons.filter((person) => 
                                person.name.toLowerCase().includes(filterText.toLowerCase()))

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newName)
    if (person !== undefined){
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)
      if (result === true) {
        const changedPerson = {...person, number: newNumber}
        personService
          .change(changedPerson)
          .then(newDetails => {
            setPersons(persons.map(person => person.id !== newDetails.id ? person : newDetails))
            setNewName('')
            setNewNumber('')
            setNotifMessage(`${person.name} was changed`)
            setTimeout(()=> {
              setNotifMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.error(error)
            setIsError(true)
            setNotifMessage(`the person '${person.name}' was already deleted from server`)
            setTimeout(()=> {
              setNotifMessage(null)
              setIsError(false)
            }, 5000)
            setPersons(persons.filter((p) => p.id !== person.id))
          })
      }
    } else {
      let personObj = {
        name: newName,
        number: newNumber,
      };
      personService
        .add(personObj)
        .then (newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setNotifMessage(`${newPerson.name} was added`)
          setTimeout(()=> {
            setNotifMessage(null)
          }, 5000)
        })
    }
  }

  const delPerson = (person) => {
    const result = window.confirm(`Delete ${person.name} ?`)
    if (result === true) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id))
          setNotifMessage(`${person.name} was deleted`)
          setTimeout(()=> {
            setNotifMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error(error)
          setIsError(true)
          setNotifMessage(`the person '${person.name}' was already deleted from server`)
          setTimeout(()=> {
            setNotifMessage(null)
            setIsError(false)
          }, 5000)
          setPersons(persons.filter((p) => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notifMessage} error={isError} />
      
      <Filter filterText = {filterText} handleFilterTextChange = {handleFilterTextChange} />

      <PersonForm
        name = {newName}
        number = {newNumber}
        handleFormSubmission = {handleFormSubmission}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
      />
      
      <h3>Numbers</h3>
      <Persons persons = {personsToDisplay.map(person => 
        {
          const personWithDel = {...person, deleteFn: () => delPerson(person)}
          return personWithDel
        })} />
    </div>
  )
}

export default App
