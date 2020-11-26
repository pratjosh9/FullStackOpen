import React from 'react'

const Person = ({name, number, deleteFn}) => {
  return(
    <div>
      {name} {number} <button onClick={deleteFn}>delete</button>
    </div>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map((person) => <Person key = {person.id} {...person} />)}
    </div>
  )
}

export default Persons