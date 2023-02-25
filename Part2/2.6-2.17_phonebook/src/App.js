import { useState } from 'react'

const Person = ({name, number, filter}) => {
  const inPhonebook = () => name.toLowerCase().includes(filter.toLowerCase())

  if (filter.length === 0) return <p>{name} {number}</p>
  else if (inPhonebook() === true) return <p>{name} {number}</p>
}

const Persons = ({persons, filter}) => {
  

  return (
  <div>
    {persons.map((person) => <Person key={person.id} name={person.name} number={person.number} filter={filter} />)}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {id: 1, name: 'Arto Hellas', number: '066 0828932'},
    {id: 2, name: 'Matti Meikäläinen', number: '098 6754852'},
    {id: 3, name: 'Lauri Markkanen', number: '063 1004774'},
    {id: 4, name: 'Eric Clapton', number: '022 8881290'}
  ])
  const [filter, setFilter] = useState('')
  const [newId, setNewId] = useState(5)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (submit) => {
    submit.preventDefault()

    const checkName = persons.some(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    )

    if (newName.length === 0 || newNumber.length === 0) return
    if (checkName === true) {
      alert(`${newName} is already added to phonebook.`)
    }
    else {
      const personObject = {
        id: newId,
        name: newName,
        number: newNumber
      }
    
      setPersons(persons.concat(personObject))
    }
    
    setNewId(newId + 1)
    setNewName('')
    setNewNumber('')
  }

  const handleFilterChange = (change) => {
    setFilter(change.target.value)
  }

  const handleNameChange = (change) => {
    setNewName(change.target.value)
  }

  const handleNumberChange = (change) => {
    setNewNumber(change.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
        <div>
          Filter people: <input 
          value={filter}
          onChange={handleFilterChange}
          />
        </div>
      <h2>Add a new number</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App