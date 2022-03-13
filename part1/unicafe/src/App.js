import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = total > 0 ? (props.good - props.bad) / total : 0 
  const positive = total > 0 ? props.good / total : 0

  return (
    <div>
      <h2>Statistics</h2>
      <ul>
        <li>good: {props.good}</li>
        <li>neutral: {props.neutral}</li>
        <li>bad: {props.bad}</li>
        <li>all: {total}</li>
        <li>average: {average} </li>
        <li>positive: {positive}</li>
      </ul>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App