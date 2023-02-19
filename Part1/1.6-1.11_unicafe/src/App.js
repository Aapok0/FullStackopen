import { useState } from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

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
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App