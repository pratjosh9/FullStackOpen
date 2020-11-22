import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const AnecdoteWithVotes = ({anecdote, votes}) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0));
  const getNextAnecdote = () => {
    let nextIdx = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(nextIdx);
  }

  const voteThis = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy); 
  }

  const maxIndex = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <AnecdoteWithVotes anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button text="vote" handleClick={voteThis}/>
      <Button text="next anecdote" handleClick={getNextAnecdote}/>
      <h1>Anecdote with most votes</h1>
      <AnecdoteWithVotes anecdote={anecdotes[maxIndex]} votes={votes[maxIndex]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)