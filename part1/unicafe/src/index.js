import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const getTotal = () => good + bad + neutral;
  const getAverage = () => {
    let total = getTotal();
    let weightSum = good * 1 + bad * -1;
    let average = weightSum / total;
    return average.toFixed(1);
  }

  const getPositive = () => {
    let total = getTotal();
    let positive = good * 100 / total;
    return positive.toFixed(1);
  }

  if (getTotal() === 0) {
    return (<p>No feedback given</p>)
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={getTotal()}/>
        <Statistic text="average" value={getAverage()}/>
        <Statistic text="positive" value={getPositive().toString() + '%'}/>  
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const acceptGoodFeedback = () => setGood(good + 1);
  const acceptNeutralFeedback = () => setNeutral(neutral + 1);
  const acceptBadFeedback = () => setBad(bad + 1);

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button text = "good" handleClick = {acceptGoodFeedback} />
        <Button text = "neutral" handleClick = {acceptNeutralFeedback} />
        <Button text = "bad" handleClick = {acceptBadFeedback} /> 
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics good={good} bad = {bad} neutral = {neutral} />
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
