import { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({title, good, neutral, bad}) => {
  let all = good + neutral + bad
  let average = (good - bad) / all
  let positive = (good / all) * 100 + ' %'

  if (all == 0) {
    return (
      <>
        <h2>{title}</h2>
        <p>No feedback given</p>
      </>
    )
  }
  
  return (
    <>
      <h2>{title}</h2>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header title='Give feedback to Unicafe!' />
      <Button name='good' handleClick={handleGoodClick} />
      <Button name='neutral' handleClick={handleNeutralClick} />
      <Button name='bad' handleClick={handleBadClick} />
      <Statistics title='Statistics' good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App