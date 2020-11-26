import React from 'react';

const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>    
    )
}

const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => 
          <Part key={part.id} name = {part.name} exercises = {part.exercises} />
        )}
      </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((s, part) => s + part.exercises, 0);
    return(
      <h4>total of {total} exercises</h4>
    ) 
}

const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
}  

const Course = ({course}) => {
    const {name, parts} = course;
    return (
      <div>
        <Header name={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
}

export default Course;
