import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average =  (props.good - props.bad) / total 
  const positive = (props.good / total * 100).toFixed(2)+"%"
  if (total > 0 ) {
    return (
        <table>
          <thead>
            <tr>
              <th><h2>statistics</h2></th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine text={"good"} value={props.good} />
            <StatisticLine text={"neutral"} value={props.neutral} />
            <StatisticLine text={"bad"} value={props.bad} />
            <StatisticLine text={"all"} value={total} />
            <StatisticLine text={"average"} value={average} />
            <StatisticLine text={"postive"} value={positive} />
          </tbody>
        </table>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
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